import { motion } from 'framer-motion';
import { Wind, Droplets, Eye, Gauge } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/constants';
import { WeatherIcon } from '@/components/UI/WeatherIcon';
import { transformWeatherData, formatTemperature, formatWindSpeed, getWeatherStatusText } from '@/utils/weather.utils';
import type { WeatherApiResponse, ComponentProps } from '@/types';

// =============================
// 🌤️ Weather Display Component
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
      className={`mt-6 ${className}`}
    >
      <div
        className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 backdrop-blur"
        style={{
          background:
            "linear-gradient(135deg, rgba(12,12,12,0.95) 0%, rgba(20,20,20,0.95) 50%, rgba(12,12,12,0.95) 100%)",
        }}
      >
        {/* Gold top border accent */}
        <div 
          className="absolute inset-x-0 top-0 h-[4px]" 
          style={{
            background: `linear-gradient(90deg, ${BRAND_CONFIG.goldDeep}, ${BRAND_CONFIG.gold}, ${BRAND_CONFIG.goldDeep})`,
          }} 
        />

        <div className="px-8 py-6">
          {/* Main Weather Section */}
          <div className="flex items-center justify-between mb-6">
            {/* Left: Current Weather */}
            <div className="flex items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 ring-1 ring-white/10">
                {transformedData ? (
                  <WeatherIcon weatherCode={transformedData.weatherCode} className="w-12 h-12" />
                ) : (
                  <WeatherIcon weatherCode={0} className="w-12 h-12" />
                )}
              </div>
              <div>
                <div className="text-6xl font-bold leading-none mb-2">
                  {transformedData ? formatTemperature(transformedData.temperature) : "–"}
                </div>
                <div 
                  className="text-lg font-medium" 
                  style={{ color: BRAND_CONFIG.gold }}
                >
                  {transformedData 
                    ? getWeatherStatusText(loading, error, transformedData.label)
                    : getWeatherStatusText(loading, error, "")
                  }
                </div>
                <div className="text-sm opacity-70 mt-1">
                  Santiago de Bougado, Porto
                </div>
              </div>
            </div>

            {/* Right: Additional Info */}
            <div className="text-right">
              <div className="text-sm opacity-70 mb-1">Sensação Térmica</div>
              <div className="text-2xl font-semibold">
                {transformedData ? formatTemperature(transformedData.apparentTemperature) : "–"}
              </div>
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
              <div className="flex items-center gap-3 mb-2">
                <Wind className="w-5 h-5 opacity-80" style={{ color: BRAND_CONFIG.gold }} />
                <span className="text-sm font-medium opacity-80">Vento</span>
              </div>
              <div className="text-2xl font-bold">
                {transformedData ? formatWindSpeed(transformedData.windSpeed) : "–"}
              </div>
            </div>
            
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
              <div className="flex items-center gap-3 mb-2">
                <Droplets className="w-5 h-5 opacity-80" style={{ color: BRAND_CONFIG.gold }} />
                <span className="text-sm font-medium opacity-80">Humidade</span>
              </div>
              <div className="text-2xl font-bold">
                {transformedData ? "75%" : "–"}
              </div>
            </div>
            
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="w-5 h-5 opacity-80" style={{ color: BRAND_CONFIG.gold }} />
                <span className="text-sm font-medium opacity-80">Visibilidade</span>
              </div>
              <div className="text-2xl font-bold">
                {transformedData ? "10 km" : "–"}
              </div>
            </div>
            
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
              <div className="flex items-center gap-3 mb-2">
                <Gauge className="w-5 h-5 opacity-80" style={{ color: BRAND_CONFIG.gold }} />
                <span className="text-sm font-medium opacity-80">Pressão</span>
              </div>
              <div className="text-2xl font-bold">
                {transformedData ? "1013 hPa" : "–"}
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="opacity-70">Dados meteorológicos em tempo real</span>
              </div>
              <div className="opacity-70">
                Atualizado a cada 10 minutos
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
