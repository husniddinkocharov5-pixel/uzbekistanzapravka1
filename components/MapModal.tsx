
import React, { useState } from 'react';
import { X, Map as MapIcon, Navigation } from 'lucide-react';
import { Station } from '../types';

interface MapModalProps {
  station: Station | null;
  onClose: () => void;
}

type MapProvider = 'google' | 'yandex';

const MapModal: React.FC<MapModalProps> = ({ station, onClose }) => {
  const [provider, setProvider] = useState<MapProvider>('google');

  if (!station) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col relative">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center z-10 shrink-0">
          <div>
            <h3 className="font-bold text-lg">{station.name}</h3>
            <p className="text-sm text-slate-400">{station.address}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Provider Toggle */}
        <div className="bg-slate-100 p-2 flex gap-2 border-b border-gray-200 shrink-0">
           <button
             onClick={() => setProvider('google')}
             className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
               provider === 'google' 
               ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-200' 
               : 'text-slate-500 hover:bg-white/50'
             }`}
           >
             <MapIcon size={16} /> Google Maps
           </button>
           <button
             onClick={() => setProvider('yandex')}
             className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
               provider === 'yandex' 
               ? 'bg-yellow-400 text-black shadow-sm ring-1 ring-yellow-500/20' 
               : 'text-slate-500 hover:bg-white/50'
             }`}
           >
             <Navigation size={16} /> Yandex Maps
           </button>
        </div>

        {/* Map Iframe */}
        <div className="flex-1 w-full bg-slate-100 relative">
          {provider === 'google' ? (
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              style={{ border: 0 }} 
              src={`https://maps.google.com/maps?q=${station.location.lat},${station.location.lng}&z=15&output=embed`}
              allowFullScreen
              title={`${station.name} Google Map`}
            ></iframe>
          ) : (
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              style={{ border: 0 }} 
              // Using Yandex Map Widget URL
              src={`https://yandex.ru/map-widget/v1/?ll=${station.location.lng},${station.location.lat}&z=16&pt=${station.location.lng},${station.location.lat},pm2rdm`}
              allowFullScreen
              title={`${station.name} Yandex Map`}
            ></iframe>
          )}
          
          {/* Overlay Info */}
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100 max-w-xs hidden md:block">
             <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-bold text-green-700 uppercase">Real-time ma'lumot</span>
             </div>
             <p className="text-sm font-medium text-gray-700">
               Navbat: <span className="font-bold text-slate-900">{station.queueStatus}</span>
             </p>
             
             <div className="grid grid-cols-2 gap-2 mt-3">
               <button 
                 onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${station.location.lat},${station.location.lng}`, '_blank')}
                 className="bg-blue-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
               >
                 <MapIcon size={12} /> Google
               </button>
               <button 
                 onClick={() => window.open(`https://yandex.uz/maps/?rtext=~${station.location.lat},${station.location.lng}&rtt=auto`, '_blank')}
                 className="bg-yellow-400 text-black text-xs font-bold py-2 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-1"
               >
                 <Navigation size={12} /> Yandex
               </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MapModal;
