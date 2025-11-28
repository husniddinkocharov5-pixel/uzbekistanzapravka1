

import React from 'react';
import { Station, Amenity } from '../types';
import QueueBadge from './QueueBadge';
import { MapPin, Star, Navigation, Fuel, Map, CreditCard, Wrench } from 'lucide-react';

interface StationCardProps {
  station: Station;
  onMapClick: (station: Station) => void;
  onPayClick: (station: Station) => void;
  onServiceClick: (station: Station) => void;
}

const StationCard: React.FC<StationCardProps> = ({ station, onMapClick, onPayClick, onServiceClick }) => {
  
  const handleGoogleNavigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.location.lat},${station.location.lng}`;
    window.open(url, '_blank');
  };

  const handleYandexNavigate = () => {
    // Yandex Maps URL scheme for navigation
    const url = `https://yandex.uz/maps/?rtext=~${station.location.lat},${station.location.lng}&rtt=auto`;
    window.open(url, '_blank');
  };

  const hasServices = station.amenities.some(a => 
    [Amenity.OilChange, Amenity.TireShop, Amenity.CarWash, Amenity.ServiceCenter].includes(a)
  );
  
  // Format Time
  const updatedTime = new Date(station.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      
      {/* Header Section */}
      <div className="p-4 pb-2">
        <div className="flex items-start justify-between mb-3">
           <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gray-50 rounded-xl p-1 border border-gray-100 flex items-center justify-center shrink-0">
                  <img 
                    src={station.logo} 
                    alt={`${station.name} logo`} 
                    className="w-full h-full object-contain rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(station.name)}&background=f1f5f9&color=334155`;
                    }}
                  />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {station.name}
                </h3>
                <div className="flex flex-col text-sm mt-0.5">
                    <div className="flex items-center text-gray-700 font-medium text-xs mb-0.5">
                       <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 mr-1">{station.region}</span>
                       <span className="text-gray-400">•</span>
                       <span className="ml-1 text-slate-500">{station.district}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-xs">
                        <MapPin size={12} className="mr-1 flex-shrink-0" />
                        <span className="truncate max-w-[180px]">{station.address}</span>
                    </div>
                </div>
              </div>
           </div>
           
           <div className="flex flex-col items-end gap-2 shrink-0">
               <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${station.isOpen ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                  {station.isOpen ? 'Ochiq' : 'Yopiq'}
               </span>
               <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  {station.rating} <span className="font-normal text-gray-400">({station.reviewCount})</span>
               </div>
           </div>
        </div>

        {/* Distance and Queue Row */}
        <div className="flex items-center justify-between mb-3">
           <div className="flex items-center gap-2">
              <QueueBadge status={station.queueStatus} />
              <div className="flex items-center gap-1.5 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                 <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                 </span>
                 <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">Bugun, {updatedTime}</span>
              </div>
           </div>
           
           {station.distance !== undefined && (
             <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                {station.distance.toFixed(1)} km
             </div>
           )}
        </div>
      </div>

      <div className="px-4 pb-4 flex-1 flex flex-col">
        {/* Fuel Prices */}
        <div className="space-y-2 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
          {station.fuels.slice(0, 3).map((fuel, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm border-b border-dashed border-slate-200 last:border-0 pb-1 last:pb-0">
              <span className="flex items-center text-slate-600 font-medium">
                <Fuel size={14} className="mr-2 text-blue-500" />
                {fuel.type}
              </span>
              <span className={`font-bold ${fuel.available ? 'text-slate-900' : 'text-gray-400 line-through decoration-2'}`}>
                {fuel.available ? `${fuel.price.toLocaleString()} so'm` : 'N/A'}
              </span>
            </div>
          ))}
          {station.fuels.length > 3 && (
             <div className="text-center text-xs text-blue-500 font-medium pt-1">
                + yana {station.fuels.length - 3} ta
             </div>
          )}
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
           {station.amenities.slice(0, 3).map((amenity, idx) => (
             <span key={idx} className="text-[10px] font-medium bg-white text-slate-600 px-2 py-1 rounded-md border border-slate-200 shadow-sm">
               {amenity}
             </span>
           ))}
        </div>

        {/* Action Buttons Grid */}
        <div className="space-y-2 mt-auto">
           {/* Navigation Actions */}
           <div className="grid grid-cols-4 gap-2">
             <button 
               onClick={() => onMapClick(station)}
               className="col-span-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl flex items-center justify-center transition-colors py-2"
               title="Xaritada ko'rish"
             >
               <Map size={20} />
             </button>
             
             {/* Split Navigation Buttons */}
             <div className="col-span-3 grid grid-cols-2 gap-2">
                <button 
                  onClick={handleGoogleNavigate}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center transition-all shadow-md active:scale-[0.98] py-2"
                  title="Google Maps"
                >
                  <MapPin size={14} className="mr-1" />
                  Google
                </button>
                <button 
                  onClick={handleYandexNavigate}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl text-xs font-bold flex items-center justify-center transition-all shadow-md active:scale-[0.98] py-2"
                  title="Yandex Maps"
                >
                  <Navigation size={14} className="mr-1" />
                  Yandex
                </button>
             </div>
           </div>
           
           {/* Secondary Actions (Pay & Service) */}
           <div className="grid grid-cols-2 gap-2">
             <button 
                onClick={() => onPayClick(station)}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all border shadow-sm active:scale-[0.98] ${hasServices ? 'col-span-1' : 'col-span-2'} bg-blue-50 border-blue-100 text-blue-700 hover:bg-blue-100`}
             >
                <CreditCard size={16} />
                To'lov
             </button>
             
             {hasServices && (
               <button 
                  onClick={() => onServiceClick(station)}
                  className="col-span-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all border border-orange-100 bg-orange-50 text-orange-700 hover:bg-orange-100 shadow-sm active:scale-[0.98]"
               >
                  <Wrench size={16} />
                  Servis
               </button>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default StationCard;
