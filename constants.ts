

import { Station, FuelType, QueueStatus, Amenity, MarketRate } from './types';

export const REGIONS = [
  "Barcha hududlar",
  "Toshkent shahri",
  "Toshkent viloyati",
  "Andijon viloyati",
  "Buxoro viloyati",
  "Farg'ona viloyati",
  "Jizzax viloyati",
  "Xorazm viloyati",
  "Namangan viloyati",
  "Navoiy viloyati",
  "Qashqadaryo viloyati",
  "Qoraqalpog'iston Respublikasi",
  "Samarqand viloyati",
  "Sirdaryo viloyati",
  "Surxondaryo viloyati"
];

// Helper to generate consistent logos for local brands
const getBrandLogo = (name: string, color: string = '2563EB') => 
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color}&color=fff&size=128&font-size=0.35&length=2&bold=true&rounded=true`;

// Updated Market Rates reflecting TODAY'S realistic prices
export const MOCK_MARKET_RATES: MarketRate[] = [
  {
    type: FuelType.Benzi80,
    price: 6800,
    change: 0,
    trend: 'stable',
    lastUpdated: new Date().toLocaleDateString()
  },
  {
    type: FuelType.Benzi92,
    price: 9500,
    change: 100,
    trend: 'up',
    lastUpdated: new Date().toLocaleDateString()
  },
  {
    type: FuelType.Benzi95,
    price: 11800,
    change: 200,
    trend: 'up',
    lastUpdated: new Date().toLocaleDateString()
  },
  {
    type: FuelType.Metan,
    price: 3750,
    change: 0,
    trend: 'stable', // Ceiling price strict
    lastUpdated: new Date().toLocaleDateString()
  },
  {
    type: FuelType.Propan,
    price: 5400,
    change: -50,
    trend: 'down',
    lastUpdated: new Date().toLocaleDateString()
  },
  {
    type: FuelType.Dizel,
    price: 12200,
    change: -100,
    trend: 'down',
    lastUpdated: new Date().toLocaleDateString()
  },
  {
    type: FuelType.Elektr,
    price: 1850,
    change: 50,
    trend: 'up',
    lastUpdated: new Date().toLocaleDateString()
  }
];

// --- REAL STATIC STATIONS (Base Data / Anchor Points) ---
// Prices updated to reflect "Today's" strict market values
const REAL_STATIONS: Station[] = [
  // ================= QASHQADARYO =================
  {
    id: 'qarshi-m39-metan',
    name: 'Qarshi M-39 Avtomarket Metan',
    logo: getBrandLogo('QAM', 'F59E0B'),
    region: 'Qashqadaryo viloyati',
    district: 'Qarshi',
    address: 'Qarshi-Muborak tra\'ssasi, Avtomarket yonida',
    location: { lat: 38.8500, lng: 65.7800 },
    fuels: [
        { type: FuelType.Metan, price: 3750, available: true },
        { type: FuelType.Propan, price: 5300, available: true }
    ],
    queueStatus: QueueStatus.High,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.Market, Amenity.PrayerRoom, Amenity.WC],
    isOpen: true,
    rating: 4.1,
    reviewCount: 420
  },
  {
    id: 'qarshi-huawei-ev',
    name: 'Huawei SuperCharge - Qarshi IT Park',
    logo: getBrandLogo('HW', 'DC2626'),
    region: 'Qashqadaryo viloyati',
    district: 'Qarshi',
    address: 'IT Park hududi, Qarshi markazi',
    location: { lat: 38.8350, lng: 65.7950 },
    fuels: [
        { type: FuelType.Elektr, price: 1750, available: true },
    ],
    queueStatus: QueueStatus.Low,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.Wifi, Amenity.Cafe, Amenity.WC],
    isOpen: true,
    rating: 5.0,
    reviewCount: 85
  },
  {
    id: 'qarshi-navoiy-lukoil',
    name: 'Lukoil - A. Navoiy',
    logo: getBrandLogo('LUK', 'DC2626'),
    region: 'Qashqadaryo viloyati',
    district: 'Qarshi',
    address: 'Alisher Navoiy shox ko\'chasi',
    location: { lat: 38.8420, lng: 65.8000 },
    fuels: [
      { type: FuelType.Benzi92, price: 10800, available: true },
      { type: FuelType.Benzi95, price: 12900, available: true },
    ],
    queueStatus: QueueStatus.Medium,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.Market, Amenity.TireShop, Amenity.OilChange],
    isOpen: true,
    rating: 4.6,
    reviewCount: 1100
  },
  {
    id: 'gazpromneft-qarshi',
    name: 'Gazpromneft - Qarshi',
    logo: getBrandLogo('GPN', '0073ff'),
    region: 'Qashqadaryo viloyati',
    district: 'Qarshi',
    address: 'A. Navoiy ko\'chasi, Markaz',
    location: { lat: 38.8450, lng: 65.7980 },
    fuels: [
      { type: FuelType.Benzi92, price: 10500, available: true },
      { type: FuelType.Benzi95, price: 12600, available: true },
      { type: FuelType.Dizel, price: 13200, available: true }
    ],
    queueStatus: QueueStatus.Low,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.Market, Amenity.Cafe, Amenity.Wifi],
    isOpen: true,
    rating: 4.7,
    reviewCount: 340
  },
  {
    id: 'muborak-gaz-zavod',
    name: 'Muborak Gaz Zavod Propan',
    logo: getBrandLogo('MGZ', '2563EB'),
    region: 'Qashqadaryo viloyati',
    district: 'Muborak',
    address: 'Gazni qayta ishlash zavodi zonasi',
    location: { lat: 39.2560, lng: 65.1540 },
    fuels: [
        { type: FuelType.Propan, price: 5100, available: true }, 
        { type: FuelType.Metan, price: 3750, available: true }
    ],
    queueStatus: QueueStatus.Medium,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.PrayerRoom],
    isOpen: true,
    rating: 4.3,
    reviewCount: 560
  },
  {
    id: 'shahrisabz-kitob-yoli',
    name: 'Shahrisabz-Kitob Metan',
    logo: getBrandLogo('SKM', 'F59E0B'),
    region: 'Qashqadaryo viloyati',
    district: 'Shahrisabz',
    address: 'Kitob yo\'li tra\'ssasi',
    location: { lat: 39.0600, lng: 66.8300 },
    fuels: [
        { type: FuelType.Metan, price: 3750, available: true },
        { type: FuelType.Benzi80, price: 6800, available: true }
    ],
    queueStatus: QueueStatus.High,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.Market, Amenity.CarWash],
    isOpen: true,
    rating: 4.0,
    reviewCount: 290
  },
  {
    id: 'kitob-m77-metan',
    name: 'Kitob M-77 Metan',
    logo: getBrandLogo('KM7', 'F59E0B'),
    region: 'Qashqadaryo viloyati',
    district: 'Kitob',
    address: 'M-77 Tra\'ssasi',
    location: { lat: 39.1350, lng: 66.9000 },
    fuels: [
        { type: FuelType.Metan, price: 3750, available: true }
    ],
    queueStatus: QueueStatus.High,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.PrayerRoom],
    isOpen: true,
    rating: 3.8,
    reviewCount: 120
  },
  {
    id: 'kokdala-oltindala',
    name: 'Ko\'kdala Oltindala Propan',
    logo: getBrandLogo('KOP', '2563EB'),
    region: 'Qashqadaryo viloyati',
    district: 'Ko\'kdala',
    address: 'Oltindala MFY hududi',
    location: { lat: 39.0000, lng: 66.0000 }, // Approx
    fuels: [
        { type: FuelType.Propan, price: 5400, available: true },
    ],
    queueStatus: QueueStatus.Low,
    lastUpdated: new Date().toISOString(),
    amenities: [],
    isOpen: true,
    rating: 3.5,
    reviewCount: 90
  },

  // ================= SURXONDARYO =================
  {
    id: 'termiz-m39-metan',
    name: 'Termiz M-39 Metan',
    logo: getBrandLogo('M39', 'F59E0B'),
    region: 'Surxondaryo viloyati',
    district: 'Termiz',
    address: 'M-39 Trassasi, Termiz shahar kirish qismi',
    location: { lat: 37.2550, lng: 67.2900 },
    fuels: [
        { type: FuelType.Metan, price: 3750, available: true },
        { type: FuelType.Propan, price: 5400, available: true }
    ],
    queueStatus: QueueStatus.Medium,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.PrayerRoom, Amenity.WC, Amenity.Market],
    isOpen: true,
    rating: 4.2,
    reviewCount: 312
  },
  {
    id: 'shorchi-bozor-gaz',
    name: 'Sho\'rchi Bozor Metan',
    logo: getBrandLogo('SBM', 'F59E0B'),
    region: 'Surxondaryo viloyati',
    district: 'Sho\'rchi',
    address: 'Sho\'rchi dehqon bozori yaqinida',
    location: { lat: 38.0120, lng: 67.7850 },
    fuels: [
        { type: FuelType.Metan, price: 3750, available: true },
        { type: FuelType.Benzi80, price: 6800, available: true }
    ],
    queueStatus: QueueStatus.Critical,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.Market, Amenity.OilChange],
    isOpen: true,
    rating: 3.5,
    reviewCount: 220
  },
  {
    id: 'sherobod-avtovokzal',
    name: 'Sherobod Avtovokzal Gaz',
    logo: getBrandLogo('SAG', 'F59E0B'),
    region: 'Surxondaryo viloyati',
    district: 'Sherobod',
    address: 'Sherobod Avtovokzal',
    location: { lat: 37.6740, lng: 67.0510 },
    fuels: [
        { type: FuelType.Metan, price: 3750, available: true },
        { type: FuelType.Propan, price: 5300, available: true }
    ],
    queueStatus: QueueStatus.Medium,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.WC, Amenity.Cafe],
    isOpen: true,
    rating: 4.0,
    reviewCount: 180
  },
  {
    id: 'sariosiyo-olchazor',
    name: 'Sariosiyo Olchazor-2 Metan',
    logo: getBrandLogo('SOM', 'F59E0B'),
    region: 'Surxondaryo viloyati',
    district: 'Sariosiyo',
    address: 'Olchazor-2 podstansiyasi yaqinida',
    location: { lat: 38.1150, lng: 67.9050 },
    fuels: [
        { type: FuelType.Metan, price: 3750, available: true },
    ],
    queueStatus: QueueStatus.Low,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.PrayerRoom, Amenity.Air],
    isOpen: true,
    rating: 4.5,
    reviewCount: 150
  },

  // ================= TOSHKENT SHAHRI =================
  {
    id: 'ung-bodomzor',
    name: 'UNG Petro - Bodomzor',
    logo: getBrandLogo('UNG', '2563EB'),
    region: 'Toshkent shahri',
    district: 'Yunusobod',
    address: 'Amir Temur ko\'chasi, 108',
    location: { lat: 41.3456, lng: 69.2845 },
    fuels: [
      { type: FuelType.Benzi80, price: 6800, available: true },
      { type: FuelType.Benzi92, price: 9200, available: true },
      { type: FuelType.Benzi95, price: 11500, available: false },
    ],
    queueStatus: QueueStatus.High,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.Market, Amenity.WC, Amenity.Air, Amenity.OilChange],
    isOpen: true,
    rating: 3.8,
    reviewCount: 1245
  },
  {
    id: 'megaplanet-ev',
    name: 'Megawatt - MegaPlanet',
    logo: getBrandLogo('MMP', '8B5CF6'),
    region: 'Toshkent shahri',
    district: 'Yunusobod',
    address: 'Ahmad Donish ko\'chasi',
    location: { lat: 41.3672, lng: 69.2917 },
    fuels: [
        { type: FuelType.Elektr, price: 1800, available: true },
    ],
    queueStatus: QueueStatus.Low,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.Wifi, Amenity.Cafe],
    isOpen: true,
    rating: 4.7,
    reviewCount: 210
  },
  {
    id: 'lukoil-qoratosh',
    name: 'Lukoil - Qoratosh',
    logo: getBrandLogo('LUK', 'DC2626'),
    region: 'Toshkent shahri',
    district: 'Shayxontohur',
    address: 'Qoratosh ko\'chasi, 5A',
    location: { lat: 41.3123, lng: 69.2345 },
    fuels: [
      { type: FuelType.Benzi92, price: 10800, available: true },
      { type: FuelType.Benzi95, price: 13000, available: true },
      { type: FuelType.Dizel, price: 13800, available: true },
    ],
    queueStatus: QueueStatus.Low,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.Market, Amenity.WC, Amenity.Cafe, Amenity.Wifi, Amenity.OilChange, Amenity.TireShop],
    isOpen: true,
    rating: 4.5,
    reviewCount: 2301
  },
  {
    id: 'metan-sergeli',
    name: 'Metan Gaz Servis',
    logo: getBrandLogo('MGS', 'F59E0B'),
    region: 'Toshkent shahri',
    district: 'Sergeli',
    address: 'Yangisergeli yo\'li, 44',
    location: { lat: 41.2234, lng: 69.2100 },
    fuels: [
      { type: FuelType.Metan, price: 3750, available: true },
    ],
    queueStatus: QueueStatus.Critical,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.PrayerRoom, Amenity.WC, Amenity.TireShop],
    isOpen: true,
    rating: 4.0,
    reviewCount: 2100
  },
  {
    id: 'yangihayot-mega',
    name: 'Yangihayot Mega Gaz',
    logo: getBrandLogo('YMG', 'F59E0B'),
    region: 'Toshkent shahri',
    district: 'Yangihayot',
    address: 'Qipchoq ko\'chasi',
    location: { lat: 41.2000, lng: 69.2200 },
    fuels: [
        { type: FuelType.Metan, price: 3750, available: true },
        { type: FuelType.Propan, price: 5400, available: true },
    ],
    queueStatus: QueueStatus.Medium,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.CarWash, Amenity.Market],
    isOpen: true,
    rating: 4.1,
    reviewCount: 450
  },
  {
    id: 'tokbor-ecopark',
    name: 'TokBor - EcoPark',
    logo: getBrandLogo('TB', '8B5CF6'),
    region: 'Toshkent shahri',
    district: 'Mirobod',
    address: 'Mahtumquli ko\'chasi, Ecopark',
    location: { lat: 41.3100, lng: 69.2900 },
    fuels: [
      { type: FuelType.Elektr, price: 1800, available: true },
    ],
    queueStatus: QueueStatus.Low,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.Wifi, Amenity.Cafe, Amenity.WC],
    isOpen: true,
    rating: 4.8,
    reviewCount: 420
  },
  {
    id: 'lukoil-airport',
    name: 'Lukoil - Aeroport',
    logo: getBrandLogo('LUK', 'DC2626'),
    region: 'Toshkent shahri',
    district: 'Yakkasaroy',
    address: 'Bobur ko\'chasi, Aeroport yaqinida',
    location: { lat: 41.2600, lng: 69.2500 },
    fuels: [
        { type: FuelType.Benzi95, price: 13000, available: true },
        { type: FuelType.Dizel, price: 13500, available: true },
    ],
    queueStatus: QueueStatus.Medium,
    lastUpdated: new Date().toISOString(),
    amenities: [Amenity.Cafe, Amenity.Wifi, Amenity.Market],
    isOpen: true,
    rating: 4.6,
    reviewCount: 1500
  }
];

// --- GENERATION LOGIC ---

// Helper types for generation
interface GeoPoint { lat: number; lng: number; }
interface GenConfig {
  count: number;
  region: string;
  center: GeoPoint;
  districts: string[];
  brands: string[];
  evChance: number; // 0 to 1 probability of being an EV station
}

// Configuration based on 2025 Statistics
// Total Benzin target: ~2000-2500
// Total EV target: ~1500-2000 (weighted to Tashkent)
const GENERATION_CONFIGS: GenConfig[] = [
  {
    // Toshkent Shahri: 600-800 Total stations target. Very high EV density (70% of all EVs).
    count: 600, 
    region: 'Toshkent shahri',
    center: { lat: 41.2995, lng: 69.2401 },
    districts: ['Yunusobod', 'Chilonzor', 'Sergeli', 'Mirzo Ulug\'bek', 'Yashnobod', 'Olmazor', 'Shayxontohur', 'Yakkasaroy', 'Mirobod', 'Uchtepa', 'Bektemir', 'Yangihayot'],
    brands: ['UNG Petro', 'Lukoil', 'Mustang', 'Intran', 'Tatneft', 'Miss', 'Poytaxt Oil', 'Grand Petrol', 'Gazpromneft'],
    evChance: 0.55 // High chance to hit ~330 EVs in city + existing
  },
  {
    // Toshkent Viloyati: 300-400 Total.
    count: 250,
    region: 'Toshkent viloyati',
    center: { lat: 41.1000, lng: 69.6000 },
    districts: ['Bekobod', 'Angren', 'Chirchiq', 'Olmaliq', 'Yangiyo\'l', 'Parkent', 'Bo\'stonliq', 'Qibray', 'Zangiota', 'Nurafshon'],
    brands: ['Viloyat Gaz', 'Angren Oil', 'Chirchiq Metan', 'UNG Petro', 'Bekobod Trans', 'Lukoil'],
    evChance: 0.20 // Growing infrastructure along highways
  },
  {
    // Farg'ona Viloyati: 100-150 Petrol + 80-120 EV.
    count: 180,
    region: 'Farg\'ona viloyati',
    center: { lat: 40.3842, lng: 71.7843 },
    districts: ['Farg\'ona sh.', 'Qo\'qon', 'Marg\'ilon', 'Rishton', 'Oltiariq', 'Quva'],
    brands: ['Vodiy Gaz', 'Farg\'ona Neft', 'Qo\'qon Metan', 'Mustang', 'Uzbekneftegaz'],
    evChance: 0.30
  },
  {
    // Samarqand Viloyati: 150-200 Petrol + 100-150 EV.
    count: 220,
    region: 'Samarqand viloyati',
    center: { lat: 39.6542, lng: 66.9597 },
    districts: ['Samarqand sh.', 'Urgut', 'Kattaqo\'rg\'on', 'Bulung\'ur', 'Jomboy', 'Pastdarg\'om'],
    brands: ['Samarqand Oil', 'Afrosiyob Gaz', 'Registon Petrol', 'Urgut Metan', 'UNG Petro', 'Lukoil'],
    evChance: 0.35
  },
  {
    // Xorazm Viloyati: 50-80 EV target.
    count: 100,
    region: 'Xorazm viloyati',
    center: { lat: 41.5500, lng: 60.6333 },
    districts: ['Urganch', 'Xiva', 'Xonqa', 'Shovot'],
    brands: ['Xorazm Gaz', 'Xiva Petrol', 'Urganch Oil', 'Jayhun Metan'],
    evChance: 0.30
  },
  {
    // Qashqadaryo Viloyati: 50-70 EV target.
    count: 120,
    region: 'Qashqadaryo viloyati',
    center: { lat: 38.8416, lng: 65.7905 },
    districts: ['Qarshi', 'Shahrisabz', 'G\'uzor', 'Koson', 'Kitob', 'Muborak', 'Ko\'kdala', 'Dehkonobod'],
    brands: ['Nasaf Gaz', 'Lukoil', 'Qarshi Oil', 'Hisor Metan', 'Gazpromneft', 'Muborak Gaz'],
    evChance: 0.25
  },
  {
    // Namangan Viloyati
    count: 100,
    region: 'Namangan viloyati',
    center: { lat: 40.9983, lng: 71.6726 },
    districts: ['Namangan sh.', 'Chust', 'Pop', 'To\'raqo\'rg\'on'],
    brands: ['Namangan Oil', 'Chust Gaz', 'Pop Metan', 'Namangan Petrol'],
    evChance: 0.15
  },
  {
    // Andijon Viloyati
    count: 100,
    region: 'Andijon viloyati',
    center: { lat: 40.7821, lng: 72.3442 },
    districts: ['Andijon sh.', 'Asaka', 'Shahrixon', 'Xonobod'],
    brands: ['Andijon Gaz', 'Bobur Oil', 'Asaka Avto', 'Vodiy Petrol'],
    evChance: 0.15
  },
  {
    // Buxoro Viloyati
    count: 90,
    region: 'Buxoro viloyati',
    center: { lat: 39.7747, lng: 64.4286 },
    districts: ['Buxoro sh.', 'G\'ijduvon', 'Vobkent', 'Kogon'],
    brands: ['Buxoro Gaz', 'Lukoil', 'Caravan Oil', 'G\'ijduvon Metan'],
    evChance: 0.20
  },
  {
    // Surxondaryo Viloyati
    count: 80,
    region: 'Surxondaryo viloyati',
    center: { lat: 37.2242, lng: 67.2783 },
    districts: ['Termiz', 'Denov', 'Sho\'rchi', 'Sherobod', 'Sariosiyo', 'Muzrabot', 'Jarqo\'rg\'on'],
    brands: ['Surxon Gaz', 'Termiz Oil', 'Denov Petrol', 'Sherobod Metan', 'Sho\'rchi Gaz', 'Muzrabot Oil'],
    evChance: 0.10
  },
  {
    // Navoiy Viloyati
    count: 70,
    region: 'Navoiy viloyati',
    center: { lat: 40.1031, lng: 65.3739 },
    districts: ['Navoiy sh.', 'Zarafshon', 'Qiziltepa', 'Karmana'],
    brands: ['Navoiy Azot', 'Zarafshon Gold Oil', 'Qizilqum Gaz'],
    evChance: 0.15
  },
  {
     // Jizzax Viloyati
    count: 60,
    region: 'Jizzax viloyati',
    center: { lat: 40.1158, lng: 67.8422 },
    districts: ['Jizzax sh.', 'Zomin', 'G\'allaorol'],
    brands: ['Jizzax Petrol', 'Zomin Eko', 'Sangzor Oil'],
    evChance: 0.10
  },
  {
     // Sirdaryo Viloyati
    count: 60,
    region: 'Sirdaryo viloyati',
    center: { lat: 40.4893, lng: 68.7838 },
    districts: ['Guliston', 'Yangiyer', 'Sirdaryo t.'],
    brands: ['Sirdaryo Gaz', 'Guliston Oil', 'Yangiyer Petrol'],
    evChance: 0.10
  },
  {
     // Qoraqalpog'iston
    count: 70,
    region: 'Qoraqalpog\'iston Respublikasi',
    center: { lat: 42.4619, lng: 59.6166 },
    districts: ['Nukus', 'Qo\'ng\'irot', 'To\'rtko\'l', 'Beruniy', 'Mo\'ynoq'],
    brands: ['Aral Oil', 'Nukus Gaz', 'Ustyurt Petrol', 'Lukoil'],
    evChance: 0.10
  }
];

const generateStations = (): Station[] => {
  let allStations = [...REAL_STATIONS];
  let idCounter = 1000;

  GENERATION_CONFIGS.forEach(config => {
    for (let i = 0; i < config.count; i++) {
      // Logic based on 2025 Stats
      const randType = Math.random();
      const isEV = randType < config.evChance;
      
      let isMetan = false;
      if (!isEV) {
          // If not EV, check if Metan based on general availability (~30-40% of non-EV stations)
          isMetan = Math.random() < 0.35;
      }

      const brandList = isEV ? ['TokBor', 'Megawatt', 'PlugShare', 'Huawei', 'Makro EV'] : config.brands;
      const brand = brandList[Math.floor(Math.random() * brandList.length)];
      const district = config.districts[Math.floor(Math.random() * config.districts.length)];
      
      // Randomize location around center (approx radius)
      const latOffset = (Math.random() - 0.5) * 0.15; 
      const lngOffset = (Math.random() - 0.5) * 0.15;

      const stationName = isEV 
        ? `${brand} EV - ${district} #${Math.floor(Math.random() * 99)}`
        : `${brand} - ${district} ${Math.floor(Math.random() * 50) + 1}`;

      const fuels: any[] = [];
      if (isEV) {
        // EV prices slightly varied around 1800
        fuels.push({ type: FuelType.Elektr, price: 1800 + (Math.floor(Math.random() * 5) * 50), available: true });
      } else if (isMetan) {
        // Metan stations often have Propan too
        fuels.push({ type: FuelType.Metan, price: 3750, available: Math.random() > 0.1 }); // High availability, fixed price
        if(Math.random() > 0.4) fuels.push({ type: FuelType.Propan, price: 5200 + (Math.floor(Math.random() * 6) * 100), available: true });
      } else {
        // Petrol Stations
        const isForeignBrand = ['Lukoil', 'Gazpromneft', 'Tatneft'].includes(brand);
        
        // Foreign brands usually have higher quality and price, mostly 92/95
        if (isForeignBrand) {
             fuels.push({ type: FuelType.Benzi92, price: 10500 + (Math.floor(Math.random() * 4) * 100), available: true });
             fuels.push({ type: FuelType.Benzi95, price: 12500 + (Math.floor(Math.random() * 5) * 100), available: true });
             fuels.push({ type: FuelType.Dizel, price: 13000 + (Math.floor(Math.random() * 5) * 100), available: true });
        } else {
             // Local brands have 80
             fuels.push({ type: FuelType.Benzi80, price: 6800, available: Math.random() > 0.2 });
             fuels.push({ type: FuelType.Benzi92, price: 9200 + (Math.floor(Math.random() * 5) * 100), available: true });
             if(Math.random() > 0.6) fuels.push({ type: FuelType.Dizel, price: 12200, available: true });
        }
        
        // Some petrol stations also have Propan
        if(Math.random() > 0.8) fuels.push({ type: FuelType.Propan, price: 5300 + (Math.floor(Math.random() * 4) * 100), available: true });
      }

      const amenitiesList = [Amenity.Market, Amenity.WC, Amenity.PrayerRoom, Amenity.Cafe, Amenity.Air, Amenity.CarWash, Amenity.OilChange, Amenity.TireShop];
      const stationAmenities = amenitiesList.filter(() => Math.random() > 0.5); // Richer amenities

      allStations.push({
        id: `gen-${config.region.substring(0,3)}-${idCounter++}`,
        name: stationName,
        logo: getBrandLogo(brand.substring(0, 3).toUpperCase(), isMetan ? 'F59E0B' : isEV ? '8B5CF6' : '2563EB'),
        region: config.region,
        district: district,
        address: `${district} markazi, ${Math.floor(Math.random() * 100)}-uy`,
        location: {
          lat: config.center.lat + latOffset,
          lng: config.center.lng + lngOffset
        },
        fuels: fuels,
        queueStatus: [QueueStatus.Low, QueueStatus.Medium, QueueStatus.High, QueueStatus.Critical][Math.floor(Math.random() * 4)],
        lastUpdated: new Date().toISOString(), // SET TO TODAY
        amenities: stationAmenities,
        isOpen: Math.random() > 0.05, // 95% chance open based on 2025 stats
        rating: 3.5 + Math.random() * 1.5, // Better quality control in 2025
        reviewCount: Math.floor(Math.random() * 1000)
      });
    }
  });

  return allStations;
};

export const MOCK_STATIONS = generateStations();
