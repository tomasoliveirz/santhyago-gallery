import type { WeatherApiResponse, ServiceResponse } from '@/types';
import { HOTEL_CONFIG, API_CONFIG } from '@/config/constants';

// =============================
// 🌤️ Weather Service
// =============================
export class WeatherService {
  private static instance: WeatherService;
  private cache: Map<string, { data: WeatherApiResponse; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private constructor() {}

  public static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  private getCacheKey(): string {
    return `${HOTEL_CONFIG.latitude},${HOTEL_CONFIG.longitude}`;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  private buildWeatherUrl(): string {
    const params = new URLSearchParams({
      latitude: String(HOTEL_CONFIG.latitude),
      longitude: String(HOTEL_CONFIG.longitude),
      timezone: HOTEL_CONFIG.timezone,
      current: [
        "temperature_2m",
        "weather_code",
        "apparent_temperature",
        "wind_speed_10m",
        "is_day",
      ].join(","),
    });

    return `${API_CONFIG.WEATHER_BASE_URL}?${params.toString()}`;
  }

  public async fetchWeatherData(): Promise<ServiceResponse<WeatherApiResponse>> {
    const cacheKey = this.getCacheKey();
    const cached = this.cache.get(cacheKey);

    // Return cached data if valid
    if (cached && this.isCacheValid(cached.timestamp)) {
      return {
        data: cached.data,
        loading: false,
        error: null,
      };
    }

    try {
      const url = this.buildWeatherUrl();
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
      }

      const data: WeatherApiResponse = await response.json();

      // Cache the response
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      return {
        data,
        loading: false,
        error: null,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
      
      return {
        data: null,
        loading: false,
        error: errorMessage,
      };
    }
  }

  public clearCache(): void {
    this.cache.clear();
  }
}

// =============================
// 🔧 Weather Service Factory
// =============================
export function createWeatherService(): WeatherService {
  return WeatherService.getInstance();
}
