import type { WeatherApiResponse, WeatherData } from '@/types';
import { getWeatherData } from '@/config/weather-mapping';

// =============================
// 🌤️ Weather Utilities
// =============================
export function transformWeatherData(apiData: WeatherApiResponse): WeatherData {
  const current = apiData.current;
  const weatherData = getWeatherData(current.weather_code);

  return {
    ...weatherData,
    temperature: Math.round(current.temperature_2m),
    apparentTemperature: Math.round(current.apparent_temperature),
    windSpeed: Math.round(current.wind_speed_10m),
    isDay: current.is_day === 1,
  };
}

export function formatTemperature(temperature: number): string {
  return `${temperature}°C`;
}

export function formatWindSpeed(windSpeed: number): string {
  return `${windSpeed} km/h`;
}

export function getWeatherStatusText(loading: boolean, error: string | null, label: string): string {
  if (loading) return "A carregar…";
  if (error) return "—";
  return label;
}
