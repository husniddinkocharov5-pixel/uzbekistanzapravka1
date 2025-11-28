
export enum FuelType {
  Benzi80 = "AI-80",
  Benzi92 = "AI-92",
  Benzi95 = "AI-95",
  Benzi98 = "AI-98",
  Metan = "Metan (CNG)",
  Propan = "Propan (LPG)",
  Dizel = "Dizel",
  Elektr = "Elektr (EV)"
}

export enum QueueStatus {
  Low = "Kam",
  Medium = "O'rtacha",
  High = "Uzun",
  Critical = "Juda uzun"
}

export enum Amenity {
  WC = "Hojatxona",
  Market = "Do'kon",
  Cafe = "Kafe",
  CarWash = "Avtomoyka",
  PrayerRoom = "Namozxona",
  Air = "Havo/Suv",
  Wifi = "Wi-Fi",
  OilChange = "Moy almashtirish",
  TireShop = "Vulkanizatsiya",
  ServiceCenter = "Servis Markazi"
}

export interface FuelPrice {
  type: FuelType;
  price: number; // in UZS
  available: boolean;
}

export interface MarketRate {
  type: FuelType;
  price: number; // Average market price
  change: number; // Change amount (e.g., +100 or -50)
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export interface Station {
  id: string;
  name: string;
  logo: string; // Brand logo URL
  region: string; // New field for Viloyat/Region
  district: string; // Tuman/City
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  fuels: FuelPrice[];
  queueStatus: QueueStatus;
  lastUpdated: string; // ISO date string
  amenities: Amenity[];
  isOpen: boolean;
  rating: number;
  reviewCount: number; // Added review count
  distance?: number; // Distance from user in km
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}