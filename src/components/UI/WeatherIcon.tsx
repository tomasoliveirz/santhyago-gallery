import { getWeatherIcon } from '@/config/weather-mapping';
import type { WeatherIconProps } from '@/types';

// =============================
// 🌤️ Weather Icon Component
// =============================
export function WeatherIcon({ weatherCode, className = 'w-8 h-8' }: WeatherIconProps) {
  const IconComponent = getWeatherIcon(weatherCode);
  return <IconComponent className={className} />;
}
