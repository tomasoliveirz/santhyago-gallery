import { useState, useEffect, useRef } from 'react';
import type { GalleryImage } from '@/types';
import { GALLERY_CONFIG } from '@/config/constants';

// =============================
// 🎞️ Simple Slideshow Hook
// =============================
export function useSlideshow(images: GalleryImage[], config?: Partial<typeof GALLERY_CONFIG>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const slideInterval = config?.slideInterval ?? GALLERY_CONFIG.slideInterval;

  // Simple auto-advance
  useEffect(() => {
    if (images.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, slideInterval);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [images.length, slideInterval]);

  // Reset to first slide when images change
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const currentImage = images[currentIndex] || null;

  return {
    currentIndex,
    currentImage,
  };
}
