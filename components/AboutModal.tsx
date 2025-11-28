
import React from 'react';
import { X, Users, TrendingUp, AlertTriangle, Target, CheckCircle2, Briefcase, Rocket, PieChart } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
                <Target size={24} className="text-white" />
            </div>
            <div>
                <h3 className="font-bold text-xl">Loyiha Maqsadi va Biznes Model</h3>
                <p className="text-slate-400 text-sm">Strategiya va daromad manbalari</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
            
            {/* Bozor Imkoniyati */}
            <section>
                <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                    <TrendingUp className="text-blue-600" />
                    Bozor Imkoniyati
                </h4>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-slate-700 leading-relaxed text-sm">
                    O‘zbekiston sharoitida avtomobillar sonining ko'pligi va yoqilg‘iga bo'lgan yuqori talab mavjud. 
                    Ilova haydovchilar va biznes egalari uchun yoqilg'i quyish jarayonini raqamlashtirish orqali bozordagi katta bo'shliqni to'ldiradi.
                </div>
            </section>

            {/* Asosiy Auditoriya */}
            <section>
                <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                    <Users className="text-green-600" />
                    Asosiy Auditoriya
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                        <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                        <div>
                            <span className="font-bold block text-slate-800">Haydovchilar</span>
                            <span className="text-sm text-gray-500">Shaxsiy transport egalari uchun qulaylik.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                        <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                        <div>
                            <span className="font-bold block text-slate-800">Taksi xizmatlari</span>
                            <span className="text-sm text-gray-500">Vaqtni tejash va daromadni oshirish.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                        <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                        <div>
                            <span className="font-bold block text-slate-800">Logistika</span>
                            <span className="text-sm text-gray-500">Yuk tashuvchilar uchun yo'nalishni optimallashtirish.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                        <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                        <div>
                            <span className="font-bold block text-slate-800">Uzoq yo'l yuruvchilar</span>
                            <span className="text-sm text-gray-500">Viloyatlararo qatnov uchun ishonchli ma'lumot.</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Biznes Model */}
            <section>
                <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                    <Briefcase className="text-purple-600" />
                    Biznes Model va Daromad
                </h4>
                <div className="space-y-3">
                     <div className="flex gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                        <div className="bg-white p-2 h-fit rounded-lg shadow-sm text-purple-600">
                            <Target size={20} />
                        </div>
                        <div>
                            <h5 className="font-bold text-slate-800">Reklama</h5>
                            <p className="text-sm text-slate-600 mt-1">
                                Auto-servislar, ehtiyot qismlar do'konlari va zapravka tarmoqlarini ilova ichida targ'ib qilish orqali daromad.
                            </p>
                        </div>
                     </div>
                     <div className="flex gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                        <div className="bg-white p-2 h-fit rounded-lg shadow-sm text-purple-600">
                            <Users size={20} />
                        </div>
                        <div>
                            <h5 className="font-bold text-slate-800">Hamkorlik (B2B)</h5>
                            <p className="text-sm text-slate-600 mt-1">
                                Yirik zapravka tarmoqlari bilan eksklyuziv shartnomalar va mijozlarni yo'naltirish.
                            </p>
                        </div>
                     </div>
                     <div className="flex gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                        <div className="bg-white p-2 h-fit rounded-lg shadow-sm text-purple-600">
                            <PieChart size={20} />
                        </div>
                        <div>
                            <h5 className="font-bold text-slate-800">Ma'lumotlar Analitikasi</h5>
                            <p className="text-sm text-slate-600 mt-1">
                                Marketing va strategik rejalashtirish uchun statistik ma'lumotlarni taqdim etish.
                            </p>
                        </div>
                     </div>
                </div>
            </section>

             {/* Kelajak Rejalari */}
             <section>
                <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                    <Rocket className="text-indigo-600" />
                    Kelajakdagi Kengaytirish
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white border border-gray-200 p-3 rounded-xl flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="font-medium text-slate-700">Online to'lov tizimini to'liq joriy etish</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-3 rounded-xl flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="font-medium text-slate-700">Servis xizmatlari (Moy, Moyka) ekotizimi</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-3 rounded-xl flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                        <span className="font-medium text-slate-700">Sodiqlik (Cashback) dasturlari</span>
                    </div>
                    <div className="bg-white border border-gray-200 p-3 rounded-xl flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                        <span className="font-medium text-slate-700">Elektromobillar infratuzilmasini rivojlantirish</span>
                    </div>
                </div>
            </section>

            {/* Dolzarb Muammolar */}
            <section>
                <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                    <AlertTriangle className="text-orange-500" />
                    Nima uchun hozir?
                </h4>
                <div className="space-y-3">
                    <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-xl">
                        <h5 className="font-bold text-slate-800 mb-1">Yoqilg'i Tanqisligi va Navbatlar</h5>
                        <p className="text-sm text-slate-600">Mavsumiy tanqislik paytida qaysi zapravkada benzin yoki gaz borligini bilish hayotiy zarurat.</p>
                    </div>
                    <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-xl">
                        <h5 className="font-bold text-slate-800 mb-1">Narx O'zgarishlari</h5>
                        <p className="text-sm text-slate-600">Narxlar tez-tez o'zgarib turadigan paytda eng arzon joyni topish iqtisod qilishga yordam beradi.</p>
                    </div>
                    <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-xl">
                        <h5 className="font-bold text-slate-800 mb-1">Qishki Mavsum</h5>
                        <p className="text-sm text-slate-600">Sovuq ob-havoda metan zapravkalarning ishlash grafigi o'zgarishi va yopilish holatlari.</p>
                    </div>
                </div>
            </section>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-gray-200">
            <button onClick={onClose} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                Tushunarli, Ilovaga qaytish
            </button>
        </div>

      </div>
    </div>
  );
};

export default AboutModal;
