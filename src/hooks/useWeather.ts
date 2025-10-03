import { useState, useEffect, useCallback } from 'react';
import type { WeatherApiResponse, ServiceResponse } from '@/types';
import { createWeatherService } from '@/services/weather.service';
import { TIMING_CONFIG } from '@/config/constants';

// =============================
// 🌤️ Weather Hook
// =============================
export function useWeather(): ServiceResponse<WeatherApiResponse> {
  const [data, setData] = useState<WeatherApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const weatherService = createWeatherService();

  const fetchWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await weatherService.fetchWeatherData();
      
      setData(result.data);
      setError(result.error);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [weatherService]);

  useEffect(() => {
    // Initial fetch
    fetchWeather();

    // Set up periodic refresh
    const intervalId = setInterval(fetchWeather, TIMING_CONFIG.WEATHER_REFRESH_MS);

    return () => clearInterval(intervalId);
  }, [fetchWeather]);

  return {
    data,
    loading,
    error,
  };
}
