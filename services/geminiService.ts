
import { GoogleGenAI } from "@google/genai";
import { Station, FuelType } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Siz O'zbekistonning barcha viloyat va tumanlaridagi yoqilg'i quyish shoxobchalari (Zapravka) bo'yicha sun'iy intellekt yordamchisisiz.
Foydalanuvchi sizdan Toshkentdan tortib Mo'ynoqgacha bo'lgan istalgan hududdagi zapravkalar haqida ma'lumot so'raydi (narxlar, joylashuv, navbatlar).
Sizga JSON formatida zapravkalar ro'yxati beriladi.
Javoblarni O'zbek tilida, qisqa, aniq va do'stona bering.
Narxlarni so'mda ayting. Navbatlarni inobatga oling (masalan, arzon joyda navbat uzun bo'lsa, ogohlantiring).
Agar ma'lumot bo'lmasa, taxmin qilmang, faqat mavjud ma'lumotga asoslaning.
Hududiy (viloyat, tuman) so'rovlarga e'tiborli bo'ling.
`;

export const askGeminiAboutStations = async (query: string, stations: Station[]): Promise<string> => {
  try {
    // We provide a simplified version of the station data to save tokens and focus context
    const stationsContext = stations.map(s => ({
      name: s.name,
      region: s.region,
      district: s.district,
      fuels: s.fuels.filter(f => f.available).map(f => `${f.type}: ${f.price} so'm`).join(', '),
      queue: s.queueStatus,
      amenities: s.amenities.join(', '),
      isOpen: s.isOpen
    }));

    const prompt = `
      Hozirgi mavjud zapravkalar ma'lumoti:
      ${JSON.stringify(stationsContext, null, 2)}

      Foydalanuvchi savoli: ${query}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "Uzr, hozir javob bera olmayman. Keyinroq urinib ko'ring.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Tizimda xatolik yuz berdi. Internet aloqasini tekshiring yoki keyinroq urinib ko'ring.";
  }
};
