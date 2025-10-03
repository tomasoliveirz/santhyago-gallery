import { motion, AnimatePresence } from 'framer-motion';
import { useSlideshow } from '@/hooks/useSlideshow';
import type { GalleryProps } from '@/types';

// =============================
// 🎞️ Fullscreen Gallery Component - Fullscreen Optimized
// =============================
export function FullscreenGallery({ images, config, className = '' }: GalleryProps) {
  // Debug logs
  console.log('FullscreenGallery:', { images, imagesLength: images?.length });

  if (!images || images.length === 0) {
    return (
      <div className={`gallery-container bg-gray-900 flex items-center justify-center ${className}`}>
        <div className="text-white text-lg">Nenhuma imagem disponível - {images?.length || 0} imagens</div>
      </div>
    );
  }

  // Versão simplificada para debug
  return (
    <div className={`gallery-container ${className}`}>
      <img
        src={images[0].url}
        alt={images[0].alt}
        className="gallery-image"
        onLoad={() => console.log('Imagem carregada:', images[0].url)}
        onError={(e) => console.log('Erro ao carregar imagem:', images[0].url, e)}
      />
      
      {/* Vignette overlay */}
      <div className="gallery-vignette" />
      
      {/* Subtle grain texture */}
      <div className="gallery-grain" />
      
      {/* Debug info */}
      <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded text-sm">
        Imagem: {images[0].alt} ({images.length} total)
      </div>
    </div>
  );
}