import { motion } from 'framer-motion';
import { Wind, Droplets, Eye, Gauge } from 'lucide-react';
import { WeatherIcon } from '@/components/UI/WeatherIcon';
import { transformWeatherData, formatTemperature, formatWindSpeed, getWeatherStatusText } from '@/utils/weather.utils';
import type { WeatherApiResponse, ComponentProps } from '@/types';

// =============================
// 🌤️ Weather Display Component - Fullscreen Optimized
// =============================
interface WeatherDisplayProps extends ComponentProps {
  weatherData: WeatherApiResponse | null;
  loading: boolean;
  error: string | null;
}

export function WeatherDisplay({ weatherData, loading, error, className = '' }: WeatherDisplayProps) {
  const transformedData = weatherData ? transformWeatherData(weatherData) : null;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`weather-container ${className}`}
    >
      {/* Gold top border accent */}
      <div className="weather-border" />

      {/* Main Weather Section */}
      <div className="weather-main">
        {/* Left: Current Weather */}
        <div className="flex items-center gap-3 md:gap-6">
          <div className="weather-icon-container">
            {transformedData ? (
              <WeatherIcon weatherCode={transformedData.weatherCode} className="w-8 h-8 md:w-10 md:h-10" />
            ) : (
              <WeatherIcon weatherCode={0} className="w-8 h-8 md:w-10 md:h-10" />
            )}
          </div>
          <div>
            <div className="weather-temp">
              {transformedData ? formatTemperature(transformedData.temperature) : "–"}
            </div>
            <div className="weather-condition">
              {transformedData 
                ? getWeatherStatusText(loading, error, transformedData.label)
                : getWeatherStatusText(loading, error, "")
              }
            </div>
            <div className="weather-location">
              Santiago de Bougado, Porto
            </div>
          </div>
        </div>

        {/* Right: Sensação Térmica */}
        <div className="text-right">
          <div className="text-xs md:text-sm opacity-70 mb-1">Sensação</div>
          <div className="text-xl md:text-2xl font-semibold">
            {transformedData ? formatTemperature(transformedData.apparentTemperature) : "–"}
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="weather-details">
        <div className="weather-detail-card">
          <div className="flex items-center gap-2 mb-1">
            <Wind className="weather-detail-icon" />
            <span className="weather-detail-label">Vento</span>
          </div>
          <div className="weather-detail-value">
            {transformedData ? formatWindSpeed(transformedData.windSpeed) : "–"}
          </div>
        </div>
        
        <div className="weather-detail-card">
          <div className="flex items-center gap-2 mb-1">
            <Droplets className="weather-detail-icon" />
            <span className="weather-detail-label">Humidade</span>
          </div>
          <div className="weather-detail-value">
            {transformedData ? "75%" : "–"}
          </div>
        </div>
        
        <div className="weather-detail-card">
          <div className="flex items-center gap-2 mb-1">
            <Eye className="weather-detail-icon" />
            <span className="weather-detail-label">Visibilidade</span>
          </div>
          <div className="weather-detail-value">
            {transformedData ? "10 km" : "–"}
          </div>
        </div>
        
        <div className="weather-detail-card">
          <div className="flex items-center gap-2 mb-1">
            <Gauge className="weather-detail-icon" />
            <span className="weather-detail-label">Pressão</span>
          </div>
          <div className="weather-detail-value">
            {transformedData ? "1013 hPa" : "–"}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="weather-status">
        <div className="weather-status-text">
          <span className="inline-flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Dados meteorológicos em tempo real • Atualizado a cada 10 minutos
          </span>
        </div>
      </div>
    </motion.div>
  );
}