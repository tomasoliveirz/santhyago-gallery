import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
} from "lucide-react";
import type { WeatherData } from '@/types';

// =============================
// 🌤️ Weather Code Mapping
// =============================
export const WEATHER_CODE_MAPPING = {
  // Clear sky
  0: {
    label: "Céu limpo",
    icon: Sun,
  },
  // Partly cloudy
  1: {
    label: "Parcialmente nublado",
    icon: CloudSun,
  },
  2: {
    label: "Parcialmente nublado", 
    icon: CloudSun,
  },
  // Overcast
  3: {
    label: "Nublado",
    icon: Cloud,
  },
  // Fog
  45: {
    label: "Nevoeiro",
    icon: CloudFog,
  },
  48: {
    label: "Nevoeiro",
    icon: CloudFog,
  },
  // Drizzle
  51: {
    label: "Chuvisco",
    icon: CloudDrizzle,
  },
  53: {
    label: "Chuvisco",
    icon: CloudDrizzle,
  },
  55: {
    label: "Chuvisco",
    icon: CloudDrizzle,
  },
  // Rain
  61: {
    label: "Chuva",
    icon: CloudRain,
  },
  63: {
    label: "Chuva",
    icon: CloudRain,
  },
  65: {
    label: "Chuva",
    icon: CloudRain,
  },
  80: {
    label: "Chuva",
    icon: CloudRain,
  },
  81: {
    label: "Chuva",
    icon: CloudRain,
  },
  82: {
    label: "Chuva",
    icon: CloudRain,
  },
  // Freezing rain
  66: {
    label: "Chuva gelada",
    icon: CloudRain,
  },
  67: {
    label: "Chuva gelada",
    icon: CloudRain,
  },
  // Snow
  71: {
    label: "Neve",
    icon: CloudSnow,
  },
  73: {
    label: "Neve",
    icon: CloudSnow,
  },
  75: {
    label: "Neve",
    icon: CloudSnow,
  },
  77: {
    label: "Neve",
    icon: CloudSnow,
  },
  85: {
    label: "Neve",
    icon: CloudSnow,
  },
  86: {
    label: "Neve",
    icon: CloudSnow,
  },
  // Thunderstorm
  95: {
    label: "Trovoada",
    icon: CloudLightning,
  },
  96: {
    label: "Trovoada",
    icon: CloudLightning,
  },
  99: {
    label: "Trovoada",
    icon: CloudLightning,
  },
} as const;

// =============================
// 🔧 Weather Helper Functions
// =============================
export function getWeatherData(weatherCode: number): WeatherData {
  const mapping = WEATHER_CODE_MAPPING[weatherCode as keyof typeof WEATHER_CODE_MAPPING];
  
  if (!mapping) {
    return {
      temperature: 0,
      weatherCode,
      apparentTemperature: 0,
      windSpeed: 0,
      label: "—",
      icon: Sun,
    };
  }

  return {
    temperature: 0, // Will be set by the weather service
    weatherCode,
    apparentTemperature: 0, // Will be set by the weather service
    windSpeed: 0, // Will be set by the weather service
    label: mapping.label,
    icon: mapping.icon,
  };
}

export function getWeatherIcon(weatherCode: number) {
  const mapping = WEATHER_CODE_MAPPING[weatherCode as keyof typeof WEATHER_CODE_MAPPING];
  return mapping?.icon || Sun;
}

export function getWeatherLabel(weatherCode: number): string {
  const mapping = WEATHER_CODE_MAPPING[weatherCode as keyof typeof WEATHER_CODE_MAPPING];
  return mapping?.label || "—";
}
