import { useSlideshow } from '@/hooks/useSlideshow';
import type { GalleryProps } from '@/types';

// =============================
// 🎞️ Fullscreen Gallery - Simple & Clean
// =============================
export function FullscreenGallery({ images, config, className = '' }: GalleryProps) {
  const {
    currentIndex,
    currentImage,
  } = useSlideshow(images, config);

  if (!images || images.length === 0) {
    return (
      <div className={`gallery-container bg-black flex items-center justify-center ${className}`}>
        <div className="text-white text-lg opacity-60">Carregando galeria...</div>
      </div>
    );
  }

  return (
    <div className={`gallery-container ${className}`}>
      <img
        key={currentImage?.id || currentIndex}
        src={currentImage?.url || images[0].url}
        alt={currentImage?.alt || images[0].alt}
        className="gallery-image"
        loading="lazy"
      />
      
      {/* Gallery Indicators - Minimal */}
      {images.length > 1 && (
        <div className="gallery-indicators">
          {images.map((_, index) => (
            <div
              key={index}
              className={`gallery-dot ${
                index === currentIndex ? 'active' : ''
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}