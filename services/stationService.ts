
import { Station, MarketRate, QueueStatus, FuelType } from '../types';
import { MOCK_STATIONS, MOCK_MARKET_RATES } from '../constants';

// =================================================================
// SERVER SIMULATSIYASI (In-Memory Database)
// Haqiqiy loyihada bu qism Backend serverda (Database) bo'ladi.
// Biz bu yerda server xotirasini simulyatsiya qilamiz.
// =================================================================

// Ilova ishga tushganda ma'lumotlarni bir marta yuklab olamiz (Server DB init)
let SERVER_STATIONS_DB: Station[] = JSON.parse(JSON.stringify(MOCK_STATIONS));
let SERVER_RATES_DB: MarketRate[] = JSON.parse(JSON.stringify(MOCK_MARKET_RATES));

export const StationService = {
  /**
   * Barcha stansiyalarni yuklash (Initial Load)
   */
  async getAllStations(): Promise<Station[]> {
    return new Promise((resolve) => {
      // Tarmoq kechikishini (Network Latency) simulyatsiya qilish: 1.2 soniya
      setTimeout(() => {
        resolve([...SERVER_STATIONS_DB]);
      }, 1200); 
    });
  },

  /**
   * Bozor narxlarini yuklash
   */
  async getMarketRates(): Promise<MarketRate[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...SERVER_RATES_DB]);
      }, 800);
    });
  },

  /**
   * Real-time yangilanishlarni olish (Polling)
   * Bu metod serverga so'rov yuborib, eng so'nggi holatni olib keladi.
   */
  async getLatestUpdates(): Promise<Station[]> {
    // 1. Server tomonida o'zgarishlarni simulyatsiya qilamiz (boshqa userlar ta'siri)
    simulateServerActivity();

    // 2. Yangilangan ma'lumotni qaytariz
    return new Promise((resolve) => {
      // Polling uchun tezroq javob (300ms)
      setTimeout(() => {
        resolve([...SERVER_STATIONS_DB]);
      }, 300);
    });
  }
};

// =================================================================
// BACKGROUND WORKER SIMULATION
// =================================================================

function simulateServerActivity() {
  // Har bir so'rovda 1-4 ta stansiyada o'zgarish bo'ladi deb faraz qilamiz
  const updatesCount = Math.floor(Math.random() * 4) + 1; 

  for (let i = 0; i < updatesCount; i++) {
    const idx = Math.floor(Math.random() * SERVER_STATIONS_DB.length);
    const station = SERVER_STATIONS_DB[idx];
    
    // 70% ehtimol bilan stansiyada o'zgarish bo'ladi
    if (Math.random() > 0.3) {
        // 1. Navbat o'zgarishi
        const statuses = [QueueStatus.Low, QueueStatus.Medium, QueueStatus.High, QueueStatus.Critical];
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        // 2. Narx o'zgarishi (Faqat Benzin 92/95 uchun kichik tebranish)
        const updatedFuels = station.fuels.map(f => {
            if ([FuelType.Benzi92, FuelType.Benzi95].includes(f.type) && Math.random() > 0.9) {
                const delta = Math.random() > 0.5 ? 100 : -100;
                return { ...f, price: f.price + delta };
            }
            return f;
        });

        // Ma'lumotni yangilash
        SERVER_STATIONS_DB[idx] = {
            ...station,
            queueStatus: newStatus,
            fuels: updatedFuels,
            lastUpdated: new Date().toISOString()
        };
    }
  }
}
