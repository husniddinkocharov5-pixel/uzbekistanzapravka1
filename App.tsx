
import React, { useState, useMemo, useEffect } from 'react';
import { Station, FuelType, QueueStatus, Amenity, MarketRate } from './types';
import { REGIONS } from './constants';
import { StationService } from './services/stationService';
import StationCard from './components/StationCard';
import ChatInterface from './components/ChatInterface';
import MapModal from './components/MapModal';
import PaymentModal from './components/PaymentModal';
import ServiceModal from './components/ServiceModal';
import MarketTicker from './components/MarketTicker';
import AboutModal from './components/AboutModal';
import TripCalculatorModal from './components/TripCalculatorModal';
import { Search, Sparkles, MapPin, Fuel, Zap, Flame, Droplets, LayoutGrid, Filter, ArrowUpDown, Clock, Check, Info, Calculator, ExternalLink, RefreshCw, WifiOff } from 'lucide-react';

// Helpers defined before usage to avoid hoisting issues
const deg2rad = (deg: number) => {
  return deg * (Math.PI/180)
};

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
};

type TabCategory = 'all' | 'benzin' | 'metan' | 'elektr';
type SortOption = 'distance' | 'price' | 'rating';

function App() {
  // Data States
  const [stations, setStations] = useState<Station[]>([]);
  const [marketRates, setMarketRates] = useState<MarketRate[]>([]);
  
  // UI States
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter & Interaction States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Barcha hududlar');
  const [activeTab, setActiveTab] = useState<TabCategory>('all');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  
  // Filter States
  const [sortBy, setSortBy] = useState<SortOption>('distance');
  const [filterOpenOnly, setFilterOpenOnly] = useState(false);
  const [filterAmenities, setFilterAmenities] = useState<Set<Amenity>>(new Set());
  
  // Modal States
  const [selectedStationForMap, setSelectedStationForMap] = useState<Station | null>(null);
  const [selectedStationForPayment, setSelectedStationForPayment] = useState<Station | null>(null);
  const [selectedStationForService, setSelectedStationForService] = useState<Station | null>(null);

  // Initial Data Fetching
  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [fetchedStations, fetchedRates] = await Promise.all([
        StationService.getAllStations(),
        StationService.getMarketRates()
      ]);
      setStations(fetchedStations);
      setMarketRates(fetchedRates);
    } catch (err) {
      console.error("Data loading failed:", err);
      setError("Server bilan aloqa yo'q. Internetni tekshiring va qayta urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Real-time Polling (Server Synchronization)
  useEffect(() => {
    if (stations.length === 0) return;

    const intervalId = setInterval(async () => {
      try {
        // Poll for updates from the "Server"
        const updatedStations = await StationService.getLatestUpdates();
        setStations(updatedStations);
      } catch (err) {
        console.warn("Background update failed (Polling error):", err);
        // We don't block the UI for background errors, just log it
      }
    }, 8000); // Poll every 8 seconds

    return () => clearInterval(intervalId);
  }, [stations.length]); // Dependency on length ensures we start polling only after initial load

  // Get User Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to Tashkent Center if permission denied
          setUserLocation({ lat: 41.2995, lng: 69.2401 }); 
        }
      );
    } else {
      // Default to Tashkent Center
       setUserLocation({ lat: 41.2995, lng: 69.2401 }); 
    }
  }, []);

  // Update stations with distance when location changes
  useEffect(() => {
    if (userLocation && stations.length > 0) {
      setStations(prev => prev.map(station => ({
        ...station,
        distance: calculateDistance(
          userLocation.lat, 
          userLocation.lng, 
          station.location.lat, 
          station.location.lng
        )
      })));
    }
  }, [userLocation, stations.length]);

  // Filter & Sort Logic
  const filteredStations = useMemo(() => {
    let result = stations.filter(station => {
      // Search
      const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            station.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            station.district.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Region Filter
      const matchesRegion = selectedRegion === 'Barcha hududlar' || station.region === selectedRegion;
      
      // Open Only
      const matchesOpen = !filterOpenOnly || station.isOpen;

      // Amenities
      let matchesAmenities = true;
      if (filterAmenities.size > 0) {
        matchesAmenities = Array.from(filterAmenities).every(a => station.amenities.includes(a));
      }
      
      // Category Tab
      let matchesTab = true;
      if (activeTab === 'benzin') {
        matchesTab = station.fuels.some(f => 
          [FuelType.Benzi80, FuelType.Benzi92, FuelType.Benzi95, FuelType.Benzi98, FuelType.Dizel].includes(f.type) && f.available
        );
      } else if (activeTab === 'metan') {
        matchesTab = station.fuels.some(f => 
          [FuelType.Metan, FuelType.Propan].includes(f.type) && f.available
        );
      } else if (activeTab === 'elektr') {
        matchesTab = station.fuels.some(f => 
          [FuelType.Elektr].includes(f.type) && f.available
        );
      }

      return matchesSearch && matchesRegion && matchesTab && matchesOpen && matchesAmenities;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === 'distance') {
        return (a.distance || 9999) - (b.distance || 9999);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating; // Highest rating first
      } else if (sortBy === 'price') {
        // Find minimum available price for the active category
        const getMinPrice = (station: Station) => {
          let relevantFuels = station.fuels.filter(f => f.available);
          if (activeTab === 'benzin') {
             relevantFuels = relevantFuels.filter(f => [FuelType.Benzi80, FuelType.Benzi92].includes(f.type));
          } else if (activeTab === 'metan') {
             relevantFuels = relevantFuels.filter(f => f.type === FuelType.Metan);
          }
          if (relevantFuels.length === 0) return 999999;
          return Math.min(...relevantFuels.map(f => f.price));
        };
        return getMinPrice(a) - getMinPrice(b);
      }
      return 0;
    });
  }, [stations, searchTerm, selectedRegion, activeTab, sortBy, filterOpenOnly, filterAmenities]);

  const toggleAmenity = (amenity: Amenity) => {
    setFilterAmenities(prev => {
      const next = new Set(prev);
      if (next.has(amenity)) next.delete(amenity);
      else next.add(amenity);
      return next;
    });
  };

  // Loading Screen
  if (isLoading && stations.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Fuel size={20} className="text-blue-600 animate-pulse" />
          </div>
        </div>
        <h2 className="mt-4 text-xl font-bold text-slate-800">Ma'lumotlar yuklanmoqda...</h2>
        <p className="text-slate-500 text-sm">Serverga ulanish jarayoni</p>
      </div>
    );
  }

  // Error Screen
  if (error && stations.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-red-100 p-4 rounded-full mb-4">
          <WifiOff size={40} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Ulanishda xatolik</h2>
        <p className="text-slate-500 max-w-md mb-6">{error}</p>
        <button 
          onClick={loadData}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-blue-200"
        >
          <RefreshCw size={20} />
          Qayta urinish
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 md:pb-10 bg-[#F8FAFC] font-sans">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/30">
              <Fuel size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">
                Uzbekistan<span className="text-blue-600">Zapravka</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">Real-time monitoring</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
                onClick={() => setIsCalculatorOpen(true)}
                className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-2 rounded-xl font-medium transition-colors border border-indigo-200"
                title="Sayohat kalkulyatori"
            >
                <Calculator size={18} />
                <span className="hidden sm:inline">Kalkulyator</span>
            </button>
            
            <button
                onClick={() => setIsAboutOpen(true)}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl font-medium transition-colors"
                title="Loyiha haqida"
            >
                <Info size={18} />
                <span className="hidden sm:inline">Info</span>
            </button>

            <button 
                onClick={() => setIsChatOpen(true)}
                className="hidden md:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-xl font-medium shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
            >
                <Sparkles size={18} className="text-yellow-400" />
                <span>AI Yordamchi</span>
            </button>
          </div>
        </div>
        
        {/* Market Ticker inserted directly into Nav sticky area */}
        <MarketTicker rates={marketRates} />
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        
        {/* Search & Main Filter Section */}
        <div className="flex flex-col gap-6 mb-6">
           <div className="flex flex-col md:flex-row gap-6 justify-between items-end md:items-center">
             <div className="w-full md:w-auto">
               <h2 className="text-3xl font-bold text-slate-900 mb-2">Yoqilg'i narxlari va lokatsiya</h2>
               <p className="text-slate-500">O'zbekiston bo'ylab eng yaqin va arzon zapravkalarni toping</p>
             </div>
             
             <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative group w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Qidirish (Nomi, Manzil)..." 
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Region Select */}
                <div className="relative group w-full sm:w-48">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <select 
                    className="w-full pl-10 pr-8 py-3 bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer shadow-sm text-gray-700"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                  >
                    {REGIONS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
             </div>
           </div>

           {/* Tabs */}
           <div className="flex flex-wrap gap-2">
             <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 inline-flex flex-wrap w-full md:w-auto">
                <button onClick={() => setActiveTab('all')} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'all' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <LayoutGrid size={16} /> Barchasi
                </button>
                <button onClick={() => setActiveTab('benzin')} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'benzin' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:bg-blue-50'}`}>
                  <Droplets size={16} /> Benzin
                </button>
                <button onClick={() => setActiveTab('metan')} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'metan' ? 'bg-orange-500 text-white shadow' : 'text-slate-600 hover:bg-orange-50'}`}>
                  <Flame size={16} /> Metan/Propan
                </button>
                <button onClick={() => setActiveTab('elektr')} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'elektr' ? 'bg-green-500 text-white shadow' : 'text-slate-600 hover:bg-green-50'}`}>
                  <Zap size={16} /> Elektr
                </button>
             </div>
           </div>

           {/* Featured Partner Banner (Ad Revenue Demo) */}
           <div className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Zap size={100} />
              </div>
              <div className="z-10 flex items-center gap-4">
                 <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                   <Info size={24} className="text-white" />
                 </div>
                 <div>
                    <h3 className="font-bold text-lg leading-tight">Bizning Hamkor: AutoService Plus</h3>
                    <p className="text-blue-900 font-medium text-sm">Ilk moy almashtirishda 20% chegirma! Promo: <span className="font-bold bg-white/20 px-1 rounded">ZAP20</span></p>
                 </div>
              </div>
              <button className="z-10 bg-white text-orange-600 px-5 py-2 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
                 Batafsil <ExternalLink size={14} />
              </button>
              <div className="absolute top-2 right-2 text-[10px] bg-black/20 px-1.5 py-0.5 rounded text-white/80">Reklama</div>
           </div>

           {/* Detailed Filters & Sorting Row */}
           <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                 <div className="flex items-center gap-2 text-sm text-gray-500 mr-2">
                    <Filter size={16} />
                    <span className="font-semibold">Saralash:</span>
                 </div>
                 <button 
                   onClick={() => setSortBy('distance')}
                   className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${sortBy === 'distance' ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                 >
                   Eng yaqin
                 </button>
                 <button 
                   onClick={() => setSortBy('price')}
                   className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${sortBy === 'price' ? 'bg-green-50 border-green-200 text-green-700 font-medium' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                 >
                   Arzon
                 </button>
                 <button 
                   onClick={() => setSortBy('rating')}
                   className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${sortBy === 'rating' ? 'bg-yellow-50 border-yellow-200 text-yellow-700 font-medium' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                 >
                   Sifatli
                 </button>
              </div>

              <div className="w-px h-8 bg-gray-200 hidden lg:block"></div>

              <div className="flex flex-wrap items-center gap-2">
                 {/* Open Only Toggle */}
                 <button 
                   onClick={() => setFilterOpenOnly(!filterOpenOnly)}
                   className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-colors ${filterOpenOnly ? 'bg-slate-800 text-white border-slate-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                 >
                   {filterOpenOnly ? <Check size={14} /> : <Clock size={14} />}
                   Faqat ochiq
                 </button>

                 {/* Amenities Chips */}
                 {[Amenity.Market, Amenity.WC, Amenity.OilChange, Amenity.TireShop].map(am => (
                   <button
                     key={am}
                     onClick={() => toggleAmenity(am)}
                     className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${filterAmenities.has(am) ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                   >
                     {am}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-900 font-bold text-lg flex items-center gap-2">
            Natijalar
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">{filteredStations.length}</span>
          </h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs text-red-500 font-bold uppercase tracking-wide">Live update</span>
          </div>
        </div>

        {/* Grid */}
        {filteredStations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500 slide-in-from-bottom-4">
            {filteredStations.map(station => (
              <StationCard 
                key={station.id} 
                station={station} 
                onMapClick={(s) => setSelectedStationForMap(s)}
                onPayClick={(s) => setSelectedStationForPayment(s)}
                onServiceClick={(s) => setSelectedStationForService(s)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mb-4">
              <Search className="text-blue-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Hech narsa topilmadi</h3>
            <p className="text-gray-500 mt-2 text-center max-w-xs">Sizning so'rovingiz bo'yicha shoxobchalar mavjud emas. Filtrlarni o'zgartirib ko'ring.</p>
            <button 
              onClick={() => {
                setSearchTerm(''); 
                setSelectedRegion('Barcha hududlar'); 
                setActiveTab('all');
                setFilterOpenOnly(false);
                setFilterAmenities(new Set());
              }}
              className="mt-6 px-6 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Filtrlarni tozalash
            </button>
          </div>
        )}
      </main>

      {/* Floating Action Button (Mobile) */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-slate-900 rounded-full shadow-xl shadow-slate-900/30 flex items-center justify-center text-white z-40 hover:scale-105 active:scale-95 transition-all"
      >
        <Sparkles size={24} className="text-yellow-400" />
      </button>

      {/* Modals */}
      <ChatInterface 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        stations={stations} 
      />

      <MapModal 
        station={selectedStationForMap}
        onClose={() => setSelectedStationForMap(null)}
      />

      <PaymentModal 
        station={selectedStationForPayment}
        onClose={() => setSelectedStationForPayment(null)}
      />

      <ServiceModal 
        station={selectedStationForService}
        onClose={() => setSelectedStationForService(null)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <TripCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        marketRates={marketRates}
      />

    </div>
  );
}

export default App;
