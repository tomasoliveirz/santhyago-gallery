// =============================
// 🏨 Hotel Configuration Types
// =============================
export interface HotelConfig {
  name: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

// =============================
// 🎨 Brand Configuration Types
// =============================
export interface BrandConfig {
  gold: string;
  goldDeep: string;
  white: string;
}

// =============================
// 🌤️ Weather API Types
// =============================
export interface WeatherApiResponse {
  current: {
    time: string;
    temperature_2m: number;
    weather_code: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    is_day?: number;
  };
}

export interface WeatherData {
  temperature: number;
  weatherCode: number;
  apparentTemperature: number;
  windSpeed: number;
  isDay?: boolean;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

// =============================
// 🖼️ Gallery Types
// =============================
export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  order?: number;
}

export interface GalleryConfig {
  images: GalleryImage[];
  slideInterval: number;
  transitionDuration: number;
}

// =============================
// ⏰ Clock Types
// =============================
export interface ClockData {
  dateStr: string;
  timeStr: string;
}

// =============================
// 🎛️ App Configuration Types
// =============================
export interface AppConfig {
  hotel: HotelConfig;
  brand: BrandConfig;
  gallery: GalleryConfig;
  timeTick: number;
  weatherRefresh: number;
}

// =============================
// 🔧 Service Response Types
// =============================
export interface ServiceResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// =============================
// 🎯 Component Props Types
// =============================
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface WeatherIconProps extends ComponentProps {
  weatherCode: number;
}

export interface GalleryProps extends ComponentProps {
  images: GalleryImage[];
  config?: Partial<GalleryConfig>;
}
