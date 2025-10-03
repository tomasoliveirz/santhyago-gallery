import { useClock } from '@/hooks/useClock';
import { useWeather } from '@/hooks/useWeather';
import { useGallery } from '@/hooks/useGallery';
import { Header } from '@/components/Layout/Header';
import { FullscreenGallery } from '@/components/Gallery/FullscreenGallery';
import { WeatherDisplay } from '@/components/Weather/WeatherDisplay';
import { Footer } from '@/components/Layout/Footer';

// =============================
// 🖥️ Reception Screen Component
// =============================
export function ReceptionScreen() {
  const { dateStr, timeStr } = useClock();
  const { data: weatherData, loading: weatherLoading, error: weatherError } = useWeather();
  const { data: galleryImages, loading: galleryLoading, error: galleryError } = useGallery();

  const clockData = { dateStr, timeStr };

  return (
    <div className="min-h-screen w-full overflow-hidden select-none cursor-default bg-[#0D0D0D] text-white p-6">
      {/* Header with hotel info and clock */}
      <Header clockData={clockData} />

      {/* Main gallery display */}
      {galleryLoading ? (
        <div className="relative h-[86vh] md:h-[88vh] w-full overflow-hidden rounded-3xl bg-gray-900 flex items-center justify-center">
          <div className="text-white text-lg">Carregando galeria...</div>
        </div>
      ) : galleryError ? (
        <div className="relative h-[86vh] md:h-[88vh] w-full overflow-hidden rounded-3xl bg-gray-900 flex items-center justify-center">
          <div className="text-white text-lg">Erro ao carregar galeria: {galleryError}</div>
        </div>
      ) : galleryImages ? (
        <FullscreenGallery images={galleryImages} />
      ) : null}

      {/* Weather information */}
      <WeatherDisplay 
        weatherData={weatherData} 
        loading={weatherLoading} 
        error={weatherError} 
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
