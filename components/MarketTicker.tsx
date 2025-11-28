
import React from 'react';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { MarketRate } from '../types';

interface MarketTickerProps {
  rates: MarketRate[];
}

const MarketTicker: React.FC<MarketTickerProps> = ({ rates }) => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm overflow-hidden">
        <div className="max-w-7xl mx-auto py-2 px-4 flex items-center overflow-x-auto no-scrollbar gap-6">
            <div className="flex items-center gap-2 text-slate-800 font-bold whitespace-nowrap shrink-0 pr-4 border-r border-gray-100">
                <div className="bg-blue-100 p-1 rounded-md text-blue-600">
                    <Info size={16} />
                </div>
                <span className="text-xs uppercase tracking-wider">O'rtacha Birja Narxlari</span>
            </div>
            
            <div className="flex gap-6 animate-none md:animate-none">
                {rates.map((rate, index) => (
                    <div key={index} className="flex items-center gap-2 shrink-0">
                        <span className="text-sm font-semibold text-slate-700">{rate.type}:</span>
                        <div className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                            <span className="text-sm font-bold text-slate-900">{rate.price.toLocaleString()}</span>
                            <span className="text-[10px] text-gray-400">so'm</span>
                        </div>
                        <div className={`flex items-center text-xs font-medium ${
                            rate.trend === 'up' ? 'text-red-500' : 
                            rate.trend === 'down' ? 'text-green-500' : 'text-gray-400'
                        }`}>
                            {rate.trend === 'up' && <TrendingUp size={12} className="mr-0.5" />}
                            {rate.trend === 'down' && <TrendingDown size={12} className="mr-0.5" />}
                            {rate.trend === 'stable' && <Minus size={12} className="mr-0.5" />}
                            
                            {rate.trend !== 'stable' && Math.abs(rate.change)}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="ml-auto text-[10px] text-gray-400 whitespace-nowrap hidden lg:block">
                Bugungi sana: {new Date().toLocaleDateString()}
            </div>
        </div>
    </div>
  );
};

export default MarketTicker;
