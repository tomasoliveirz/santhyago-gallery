import { useClock } from '@/hooks/useClock';
import { useWeather } from '@/hooks/useWeather';
import { useGallery } from '@/hooks/useGallery';
import { Header } from '@/components/Layout/Header';
import { FullscreenGallery } from '@/components/Gallery/FullscreenGallery';
import { WeatherDisplay } from '@/components/Weather/WeatherDisplay';
import { Footer } from '@/components/Layout/Footer';

// =============================
// 🖥️ Reception Screen Component - Fullscreen Optimized
// =============================
export function ReceptionScreen() {
  const { dateStr, timeStr } = useClock();
  const { data: weatherData, loading: weatherLoading, error: weatherError } = useWeather();
  const { data: galleryImages, loading: galleryLoading, error: galleryError } = useGallery();

  const clockData = { dateStr, timeStr };

  return (
    <div className="h-screen w-screen overflow-hidden select-none cursor-default bg-[#0D0D0D] text-white">
      {/* Header - Fixed height */}
      <Header clockData={clockData} />

      {/* Main Gallery - Flexible height */}
      <div className="flex-1 p-2 md:p-4">
        {galleryLoading ? (
          <div className="gallery-container bg-gray-900 flex items-center justify-center">
            <div className="text-white text-lg">Carregando galeria...</div>
          </div>
        ) : galleryError ? (
          <div className="gallery-container bg-gray-900 flex items-center justify-center">
            <div className="text-white text-lg">Erro ao carregar galeria: {galleryError}</div>
          </div>
        ) : galleryImages ? (
          <FullscreenGallery images={galleryImages} />
        ) : (
          <div className="gallery-container bg-gray-900 flex items-center justify-center">
            <div className="text-white text-lg">Nenhuma imagem disponível</div>
          </div>
        )}
      </div>

      {/* Weather - Fixed height */}
      <WeatherDisplay 
        weatherData={weatherData} 
        loading={weatherLoading} 
        error={weatherError} 
      />

      {/* Footer - Fixed height */}
      <Footer />
    </div>
  );
}