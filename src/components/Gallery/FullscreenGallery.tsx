import { motion, AnimatePresence } from 'framer-motion';
import { useSlideshow } from '@/hooks/useSlideshow';
import type { GalleryProps } from '@/types';

// =============================
// 🎞️ Fullscreen Gallery Component
// =============================
export function FullscreenGallery({ images, config, className = '' }: GalleryProps) {
  const {
    currentIndex,
    currentImage,
    transitionDuration,
  } = useSlideshow(images, config);

  if (!currentImage) {
    return (
      <div className={`relative h-[86vh] md:h-[88vh] w-full overflow-hidden rounded-3xl bg-gray-900 flex items-center justify-center ${className}`}>
        <div className="text-white text-lg">Nenhuma imagem disponível</div>
      </div>
    );
  }

  return (
    <div className={`relative h-[75vh] md:h-[78vh] w-full overflow-hidden rounded-3xl ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage.id}
          src={currentImage.url}
          alt={currentImage.alt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.0, scale: 1.01 }}
          transition={{ duration: transitionDuration / 1000, ease: "easeOut" }}
          loading="lazy"
        />
      </AnimatePresence>
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.65)_100%)]" />
      
      {/* Subtle grain texture */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" 
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "3px 3px"
        }} 
      />
      
      {/* Slide indicator (optional) */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
