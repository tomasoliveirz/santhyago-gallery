import { motion } from 'framer-motion';
import { Thermometer, Wind } from 'lucide-react';
import { BRAND_CONFIG, HOTEL_CONFIG } from '@/config/constants';
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
      className={`mt-4 ${className}`}
    >
      <div
        className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 backdrop-blur"
        style={{
          background:
            "linear-gradient(90deg, rgba(12,12,12,0.85) 0%, rgba(12,12,12,0.85) 60%, rgba(12,12,12,0.7) 100%)",
        }}
      >
        {/* Gold top border accent */}
        <div 
          className="absolute inset-x-0 top-0 h-[3px]" 
          style={{
            background: `linear-gradient(90deg, ${BRAND_CONFIG.goldDeep}, ${BRAND_CONFIG.gold})`,
          }} 
        />

        <div className="px-6 py-4 grid grid-cols-12 gap-4 items-center">
          {/* Left: Current icon + temp */}
          <div className="col-span-12 md:col-span-5 flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
              {transformedData ? (
                <WeatherIcon weatherCode={transformedData.weatherCode} />
              ) : (
                <WeatherIcon weatherCode={0} />
              )}
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold leading-none">
                {transformedData ? formatTemperature(transformedData.temperature) : "–"}
              </div>
              <div 
                className="text-sm opacity-90" 
                style={{ color: BRAND_CONFIG.gold }}
              >
                {transformedData 
                  ? getWeatherStatusText(loading, error, transformedData.label)
                  : getWeatherStatusText(loading, error, "")
                }
              </div>
            </div>
          </div>

          {/* Right: details inline */}
          <div className="col-span-12 md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">
              <div className="flex items-center gap-2 opacity-80">
                <Thermometer className="w-4 h-4" />
                Sensação
              </div>
              <div className="text-xl font-semibold">
                {transformedData ? formatTemperature(transformedData.apparentTemperature) : "–"}
              </div>
            </div>
            
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">
              <div className="flex items-center gap-2 opacity-80">
                <Wind className="w-4 h-4" />
                Vento
              </div>
              <div className="text-xl font-semibold">
                {transformedData ? formatWindSpeed(transformedData.windSpeed) : "–"}
              </div>
            </div>
            
            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3 hidden md:block">
              <div className="flex items-center gap-2 opacity-80">Local</div>
              <div className="text-xl font-semibold">{HOTEL_CONFIG.city}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
