import { useClock } from '@/hooks/useClock';
import { useWeather } from '@/hooks/useWeather';
import { useGallery } from '@/hooks/useGallery';
import { FullscreenGallery } from '@/components/Gallery/FullscreenGallery';
import { TopOverlay } from '@/components/Layout/TopOverlay';
import { WeatherOverlay } from '@/components/Weather/WeatherOverlay';

// =============================
// 🖥️ Hotel Santhyago Trofa - Reception Screen
// =============================
export function ReceptionScreen() {
  const { dateStr, timeStr } = useClock();
  const { data: weatherData, loading: weatherLoading, error: weatherError } = useWeather();
  const { data: galleryImages } = useGallery();

  const clockData = { dateStr, timeStr };

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      {/* Full-Bleed Gallery */}
      <FullscreenGallery images={galleryImages || []} />

      {/* Top Overlay - Brand & Clock */}
      <TopOverlay clockData={clockData} />

      {/* Bottom Overlay - Weather */}
      <WeatherOverlay 
        weatherData={weatherData} 
        loading={weatherLoading} 
        error={weatherError} 
      />

      {/* Credits */}
      <div className="credits">
        Open-Meteo
      </div>
    </div>
  );
}