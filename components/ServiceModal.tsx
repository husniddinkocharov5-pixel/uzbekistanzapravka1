
import React, { useState } from 'react';
import { X, Wrench, Calendar, Clock, Check } from 'lucide-react';
import { Station, Amenity } from '../types';

interface ServiceModalProps {
  station: Station | null;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ station, onClose }) => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!station) return null;

  // Filter only relevant services from amenities
  const availableServices = station.amenities.filter(a => 
    [Amenity.OilChange, Amenity.TireShop, Amenity.CarWash, Amenity.ServiceCenter].includes(a)
  );

  const times = ['09:00', '10:00', '11:00', '13:00', '14:30', '16:00', '17:30'];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setSelectedService('');
        setSelectedTime('');
      }, 2500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Wrench size={20} className="text-orange-400" />
            Servisga Yozilish
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-10 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check size={40} className="text-green-600" />
            </div>
            <h4 className="text-2xl font-bold text-slate-800 mb-2">Navbat Band Qilindi!</h4>
            <p className="text-slate-500">Sizning arizangiz qabul qilindi. Belgilangan vaqtda kutib qolamiz.</p>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="p-6">
            <div className="mb-6 flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <img src={station.logo} alt={station.name} className="w-12 h-12 object-contain bg-white rounded-lg p-1 border" />
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase">Servis Markazi</p>
                <h4 className="font-bold text-slate-900">{station.name}</h4>
              </div>
            </div>

            {/* Service Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Xizmat turi</label>
              <div className="space-y-2">
                {availableServices.map((service, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between ${
                      selectedService === service 
                        ? 'bg-orange-50 border-orange-500 text-orange-900 ring-1 ring-orange-500' 
                        : 'bg-white border-gray-200 hover:bg-gray-50 text-slate-700'
                    }`}
                  >
                    <span className="font-medium">{service}</span>
                    {selectedService === service && <Check size={18} className="text-orange-500" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Vaqtni tanlang (Bugun)</label>
              <div className="grid grid-cols-4 gap-2">
                {times.map((time, idx) => (
                   <button
                     key={idx}
                     type="button"
                     onClick={() => setSelectedTime(time)}
                     className={`py-2 rounded-lg text-sm font-medium border transition-colors ${
                        selectedTime === time
                        ? 'bg-slate-800 text-white border-slate-800'
                        : 'bg-white text-slate-600 border-gray-200 hover:border-gray-300'
                     }`}
                   >
                     {time}
                   </button>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing || !selectedService || !selectedTime}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3.5 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Band qilinmoqda...
                </>
              ) : (
                <>
                  <Calendar size={20} />
                  Band qilish
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ServiceModal;
