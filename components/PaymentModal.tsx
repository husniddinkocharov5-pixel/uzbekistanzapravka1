
import React, { useState } from 'react';
import { X, CreditCard, Check, Banknote, QrCode, Smartphone, ArrowRight } from 'lucide-react';
import { Station } from '../types';

interface PaymentModalProps {
  station: Station | null;
  onClose: () => void;
}

type PaymentMethod = 'click' | 'payme' | 'uzum' | 'qr';

const PaymentModal: React.FC<PaymentModalProps> = ({ station, onClose }) => {
  const [amount, setAmount] = useState('');
  const [selectedFuel, setSelectedFuel] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!station) return null;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call / App Redirect
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setAmount('');
        setSelectedFuel('');
        setPaymentMethod(null);
      }, 3000);
    }, 2000);
  };

  const formatCurrency = (val: string) => {
    // Simple formatter for display
    return val.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center shrink-0">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <CreditCard size={20} className="text-blue-400" />
            Onlayn To'lov
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="p-10 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300 h-full">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check size={40} className="text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-2">To'lov Muvaffaqiyatli!</h4>
              <p className="text-slate-500 mb-2">Sizning to'lovingiz qabul qilindi.</p>
              <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 text-sm font-mono text-slate-600">
                ID: {Math.floor(Math.random() * 10000000)}
              </div>
            </div>
          ) : (
            <form onSubmit={handlePayment} className="p-6 space-y-6">
              
              {/* Station Info */}
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <img src={station.logo} alt={station.name} className="w-12 h-12 object-contain bg-white rounded-lg p-1 border" />
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase">Stansiya</p>
                  <h4 className="font-bold text-slate-900 leading-tight">{station.name}</h4>
                </div>
              </div>

              {/* Step 1: Fuel & Amount */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Yoqilg'i turi</label>
                  <div className="grid grid-cols-2 gap-2">
                    {station.fuels.filter(f => f.available).map((fuel, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedFuel(fuel.type)}
                        className={`p-2.5 rounded-xl border text-sm font-medium transition-all text-left ${
                          selectedFuel === fuel.type 
                            ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200' 
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="block">{fuel.type}</span>
                        <span className="text-xs opacity-80 font-normal">{fuel.price.toLocaleString()} so'm</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">To'lov summasi (so'm)</label>
                  <div className="relative">
                    <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Masalan: 100 000"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-lg font-bold"
                    />
                  </div>
                  {amount && (
                     <p className="text-right text-xs text-gray-500 mt-1">
                        {formatCurrency(amount)} so'm
                     </p>
                  )}
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">To'lov turini tanlang</label>
                <div className="grid grid-cols-2 gap-3">
                   {/* Click */}
                   <button
                     type="button"
                     onClick={() => setPaymentMethod('click')}
                     className={`relative p-3 rounded-xl border transition-all flex flex-col items-center justify-center gap-2 h-24 ${
                        paymentMethod === 'click'
                        ? 'bg-[#0073ff]/10 border-[#0073ff] ring-1 ring-[#0073ff]'
                        : 'bg-white border-gray-200 hover:border-[#0073ff]/50'
                     }`}
                   >
                      <div className="bg-[#0073ff] text-white font-extrabold text-lg italic px-2 rounded">
                          CLICK
                      </div>
                      <span className="text-xs font-medium text-slate-600">Click Evolution</span>
                      {paymentMethod === 'click' && <div className="absolute top-2 right-2 w-2 h-2 bg-[#0073ff] rounded-full" />}
                   </button>

                   {/* Payme */}
                   <button
                     type="button"
                     onClick={() => setPaymentMethod('payme')}
                     className={`relative p-3 rounded-xl border transition-all flex flex-col items-center justify-center gap-2 h-24 ${
                        paymentMethod === 'payme'
                        ? 'bg-[#00cccc]/10 border-[#00cccc] ring-1 ring-[#00cccc]'
                        : 'bg-white border-gray-200 hover:border-[#00cccc]/50'
                     }`}
                   >
                      <div className="bg-[#00cccc] text-white font-bold text-lg px-2 rounded">
                          Payme
                      </div>
                      <span className="text-xs font-medium text-slate-600">Payme GO</span>
                      {paymentMethod === 'payme' && <div className="absolute top-2 right-2 w-2 h-2 bg-[#00cccc] rounded-full" />}
                   </button>

                   {/* Uzum */}
                   <button
                     type="button"
                     onClick={() => setPaymentMethod('uzum')}
                     className={`relative p-3 rounded-xl border transition-all flex flex-col items-center justify-center gap-2 h-24 ${
                        paymentMethod === 'uzum'
                        ? 'bg-[#7000FF]/10 border-[#7000FF] ring-1 ring-[#7000FF]'
                        : 'bg-white border-gray-200 hover:border-[#7000FF]/50'
                     }`}
                   >
                      <div className="bg-[#7000FF] text-white font-bold text-lg px-2 rounded lowercase">
                          uzum
                      </div>
                      <span className="text-xs font-medium text-slate-600">Uzum Bank</span>
                      {paymentMethod === 'uzum' && <div className="absolute top-2 right-2 w-2 h-2 bg-[#7000FF] rounded-full" />}
                   </button>

                   {/* QR Code */}
                   <button
                     type="button"
                     onClick={() => setPaymentMethod('qr')}
                     className={`relative p-3 rounded-xl border transition-all flex flex-col items-center justify-center gap-2 h-24 ${
                        paymentMethod === 'qr'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                     }`}
                   >
                      <QrCode size={28} className={paymentMethod === 'qr' ? 'text-white' : 'text-slate-700'} />
                      <span className={`text-xs font-medium ${paymentMethod === 'qr' ? 'text-slate-200' : 'text-slate-600'}`}>QR Kod</span>
                   </button>
                </div>
              </div>

              {/* QR Code Display (Conditional) */}
              {paymentMethod === 'qr' && (
                  <div className="bg-slate-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center animate-in zoom-in duration-200">
                      <div className="bg-white p-3 rounded-xl shadow-sm mb-3">
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=uz.zapravka.payment.${station.id}.${amount || '0'}`} 
                            alt="Payment QR" 
                            className="w-32 h-32"
                          />
                      </div>
                      <p className="text-sm font-bold text-slate-800 mb-1">Kassada skanerlang</p>
                      <p className="text-xs text-slate-500">Istalgan to'lov ilovasi orqali to'lang</p>
                  </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isProcessing || !amount || !selectedFuel || !paymentMethod}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    paymentMethod === 'click' ? 'bg-[#0073ff] hover:bg-[#0060d6] text-white shadow-blue-200' :
                    paymentMethod === 'payme' ? 'bg-[#00cccc] hover:bg-[#00b3b3] text-white shadow-teal-200' :
                    paymentMethod === 'uzum' ? 'bg-[#7000FF] hover:bg-[#6000db] text-white shadow-purple-200' :
                    'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-300'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Bajarilmoqda...
                  </>
                ) : (
                  <>
                    {paymentMethod === 'click' && "Click orqali to'lash"}
                    {paymentMethod === 'payme' && "Payme orqali to'lash"}
                    {paymentMethod === 'uzum' && "Uzum orqali to'lash"}
                    {paymentMethod === 'qr' && "To'lovni tasdiqlash"}
                    {!paymentMethod && "To'lash"}
                    {!isProcessing && paymentMethod && <ArrowRight size={20} />}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
