
import React, { useState } from 'react';
import { X, Calculator, ArrowRight, Fuel } from 'lucide-react';
import { FuelType } from '../types';

interface TripCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  marketRates: { type: FuelType; price: number }[];
}

const TripCalculatorModal: React.FC<TripCalculatorModalProps> = ({ isOpen, onClose, marketRates }) => {
  const [distance, setDistance] = useState<string>('');
  const [consumption, setConsumption] = useState<string>(''); // L/100km or m3/100km
  
  if (!isOpen) return null;

  const calculateCost = (price: number) => {
    const dist = parseFloat(distance);
    const cons = parseFloat(consumption);
    if (isNaN(dist) || isNaN(cons)) return 0;
    return (dist / 100) * cons * price;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Calculator size={20} className="text-white" />
            Sayohat Xarajatlari
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
            <p className="text-sm text-gray-500 mb-6">
                Masofa va mashinangiz sarfini kiriting, biz turli xil yoqilg'ilarda qancha pul ketishini hisoblab beramiz.
            </p>

            <div className="space-y-4 mb-8">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Masofa (km)</label>
                    <input 
                        type="number" 
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        placeholder="Masalan: 450"
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">O'rtacha sarf (100 km uchun)</label>
                    <input 
                        type="number" 
                        value={consumption}
                        onChange={(e) => setConsumption(e.target.value)}
                        placeholder="Litr yoki Kub. Masalan: 9"
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                    />
                </div>
            </div>

            {distance && consumption && (
                <div className="space-y-3 animate-in slide-in-from-bottom-2">
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-2">Tahminiy Xarajatlar:</h4>
                    
                    {marketRates.map((rate, idx) => {
                         const cost = calculateCost(rate.price);
                         if (cost === 0) return null;
                         
                         return (
                            <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-2">
                                    <div className="bg-white p-1.5 rounded-lg border border-gray-200">
                                        <Fuel size={16} className="text-indigo-500" />
                                    </div>
                                    <span className="font-medium text-slate-700">{rate.type}</span>
                                </div>
                                <div className="text-right">
                                    <span className="block font-bold text-slate-900">{cost.toLocaleString(undefined, { maximumFractionDigits: 0 })} so'm</span>
                                    <span className="text-[10px] text-gray-400">{rate.price} so'm/birlik</span>
                                </div>
                            </div>
                         );
                    })}
                </div>
            )}
            
            {(!distance || !consumption) && (
                <div className="bg-indigo-50 text-indigo-800 p-4 rounded-xl text-sm text-center">
                    Hisoblash uchun ma'lumotlarni kiriting
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TripCalculatorModal;
