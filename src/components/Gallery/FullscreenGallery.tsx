import { motion, AnimatePresence } from 'framer-motion';
import { useSlideshow } from '@/hooks/useSlideshow';
import type { GalleryProps } from '@/types';

// =============================
// 🎞️ Fullscreen Gallery Component - Fullscreen Optimized
// =============================
export function FullscreenGallery({ images, config, className = '' }: GalleryProps) {
  const {
    currentIndex,
    currentImage,
    transitionDuration,
  } = useSlideshow(images, config);

  if (!currentImage) {
    return (
      <div className={`gallery-container bg-gray-900 flex items-center justify-center ${className}`}>
        <div className="text-white text-lg">Nenhuma imagem disponível</div>
      </div>
    );
  }

  return (
    <div className={`gallery-container ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage.id}
          src={currentImage.url}
          alt={currentImage.alt}
          className="gallery-image"
          initial={{ opacity: 0, scale: 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.0, scale: 1.01 }}
          transition={{ duration: transitionDuration / 1000, ease: "easeOut" }}
          loading="lazy"
        />
      </AnimatePresence>
      
      {/* Vignette overlay */}
      <div className="gallery-vignette" />
      
      {/* Subtle grain texture */}
      <div className="gallery-grain" />
      
      {/* Slide indicator */}
      {images.length > 1 && (
        <div className="gallery-indicators">
          {images.map((_, index) => (
            <div
              key={index}
              className={`gallery-dot ${
                index === currentIndex ? 'active' : 'inactive'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}