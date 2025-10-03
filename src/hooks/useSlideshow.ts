import { useState, useEffect, useRef, useCallback } from 'react';
import type { GalleryImage } from '@/types';
import { GALLERY_CONFIG } from '@/config/constants';

// =============================
// 🎞️ Slideshow Hook
// =============================
export function useSlideshow(images: GalleryImage[], config?: Partial<typeof GALLERY_CONFIG>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<number | null>(null);

  const slideInterval = config?.slideInterval ?? GALLERY_CONFIG.slideInterval;
  const transitionDuration = config?.transitionDuration ?? GALLERY_CONFIG.transitionDuration;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const previousSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
    }
  }, [images.length]);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    if (isPlaying && images.length > 1) {
      timerRef.current = setInterval(nextSlide, slideInterval);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, images.length, slideInterval, nextSlide]);

  // Reset to first slide when images change
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const currentImage = images[currentIndex] || null;

  return {
    currentIndex,
    currentImage,
    isPlaying,
    totalSlides: images.length,
    nextSlide,
    previousSlide,
    goToSlide,
    play,
    pause,
    togglePlayPause,
    slideInterval,
    transitionDuration,
  };
}
