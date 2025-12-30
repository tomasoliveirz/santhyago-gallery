import { WeatherIcon } from '@/components/UI/WeatherIcon';
import { transformWeatherData, formatTemperature, getWeatherStatusText } from '@/utils/weather.utils';
import { HOTEL_CONFIG } from '@/config/constants';
import type { WeatherApiResponse, ComponentProps } from '@/types';

// =============================
// 🌤️ Weather Overlay - Minimal Premium Style
// =============================
interface WeatherOverlayProps extends ComponentProps {
  weatherData: WeatherApiResponse | null;
  loading: boolean;
  error: string | null;
}

export function WeatherOverlay({ weatherData, loading, error, className = '' }: WeatherOverlayProps) {
  const transformedData = weatherData ? transformWeatherData(weatherData) : null;

  return (
    <div className={`weather-overlay ${className}`}>
      {/* Current Weather */}
      <div className="weather-main">
        <div className="weather-current">
          <div className="weather-icon">
            {transformedData ? (
              <WeatherIcon weatherCode={transformedData.weatherCode} className="w-full h-full" />
            ) : (
              <WeatherIcon weatherCode={0} className="w-full h-full" />
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
              {HOTEL_CONFIG.city}
            </div>
          </div>
        </div>

        {/* Forecast Chips */}
        <div className="weather-forecast">
          <div className="forecast-chip">
            <div className="forecast-day">Amanhã</div>
            <div className="forecast-icon">
              <WeatherIcon weatherCode={transformedData?.weatherCode || 0} className="w-full h-full" />
            </div>
            <div className="forecast-temps">
              {transformedData ? `${Math.round(transformedData.temperature + 2)}°` : "–"}
            </div>
          </div>

          <div className="forecast-chip">
            <div className="forecast-day">Depois</div>
            <div className="forecast-icon">
              <WeatherIcon weatherCode={transformedData?.weatherCode || 0} className="w-full h-full" />
            </div>
            <div className="forecast-temps">
              {transformedData ? `${Math.round(transformedData.temperature - 1)}°` : "–"}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
