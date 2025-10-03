import type { AppConfig, HotelConfig, BrandConfig, GalleryConfig } from '@/types';

// =============================
// 🏨 Hotel Configuration
// =============================
export const HOTEL_CONFIG: HotelConfig = {
  name: "Hotel Santhyago Trofa",
  city: "Trofa, PT",
  latitude: 41.3392,
  longitude: -8.5610,
  timezone: "Europe/Lisbon",
};

// =============================
// 🎨 Brand Configuration
// =============================
export const BRAND_CONFIG: BrandConfig = {
  gold: "#C9A94A",
  goldDeep: "#8A6D2F",
  white: "#FFFFFF",
};

// =============================
// 🖼️ Gallery Configuration
// =============================
export const GALLERY_CONFIG: GalleryConfig = {
  images: [
    // Quartos Corporativos (prioridade alta)
    {
      id: "h-corporate-double",
      url: "/images/h-corporate-double.jpg",
      alt: "Quarto Corporativo - Double",
      order: 1,
    },
    {
      id: "h-corporate-twin",
      url: "/images/h-corporate-twin.jpg",
      alt: "Quarto Corporativo - Twin",
      order: 2,
    },
    // Quartos Standard
    {
      id: "h-standard-double",
      url: "/images/h-standard-double.jpg",
      alt: "Quarto Standard - Double",
      order: 3,
    },
    {
      id: "h-standard-twin",
      url: "/images/h-standard-twin.jpg",
      alt: "Quarto Standard - Twin",
      order: 4,
    },
    {
      id: "h-standard-family",
      url: "/images/h-standard-family.jpg",
      alt: "Quarto Standard - Family",
      order: 5,
    },
    // Quarto de Mobilidade
    {
      id: "h-mobilidade",
      url: "/images/h-mobilidade.jpg",
      alt: "Quarto de Mobilidade Reduzida",
      order: 6,
    },
    // Áreas comuns
    {
      id: "bandeiras",
      url: "/images/bandeiras.jpg",
      alt: "Área de Recepção com Bandeiras",
      order: 7,
    },
    {
      id: "area-comum-1",
      url: "/images/1.jpg",
      alt: "Área Comum do Hotel - 1",
      order: 8,
    },
    {
      id: "area-comum-2",
      url: "/images/2.jpg",
      alt: "Área Comum do Hotel - 2",
      order: 9,
    },
    {
      id: "area-comum-3",
      url: "/images/3.jpg",
      alt: "Área Comum do Hotel - 3",
      order: 10,
    },
    {
      id: "area-comum-4",
      url: "/images/4.jpg",
      alt: "Área Comum do Hotel - 4",
      order: 11,
    },
    {
      id: "area-comum-5",
      url: "/images/5.jpg",
      alt: "Área Comum do Hotel - 5",
      order: 12,
    },
    {
      id: "area-comum-6",
      url: "/images/6.jpg",
      alt: "Área Comum do Hotel - 6",
      order: 13,
    },
    {
      id: "area-comum-7",
      url: "/images/7.jpg",
      alt: "Área Comum do Hotel - 7",
      order: 14,
    },
    {
      id: "area-comum-8",
      url: "/images/8.jpg",
      alt: "Área Comum do Hotel - 8",
      order: 15,
    },
    {
      id: "area-comum-9",
      url: "/images/9.jpg",
      alt: "Área Comum do Hotel - 9",
      order: 16,
    },
    {
      id: "area-comum-10",
      url: "/images/10.jpg",
      alt: "Área Comum do Hotel - 10",
      order: 17,
    },
  ],
  slideInterval: 7000,
  transitionDuration: 1000,
};

// =============================
// ⏰ Timing Configuration
// =============================
export const TIMING_CONFIG = {
  TIME_TICK_MS: 1000,
  WEATHER_REFRESH_MS: 10 * 60 * 1000, // 10 minutes
} as const;

// =============================
// 🌐 API Configuration
// =============================
export const API_CONFIG = {
  WEATHER_BASE_URL: "https://api.open-meteo.com/v1/forecast",
  GALLERY_API_ENDPOINT: "http://localhost:3001/api/gallery", // Endpoint para buscar imagens do servidor
} as const;

// =============================
// 🎛️ Main App Configuration
// =============================
export const APP_CONFIG: AppConfig = {
  hotel: HOTEL_CONFIG,
  brand: BRAND_CONFIG,
  gallery: GALLERY_CONFIG,
  timeTick: TIMING_CONFIG.TIME_TICK_MS,
  weatherRefresh: TIMING_CONFIG.WEATHER_REFRESH_MS,
};
