import { useState, useEffect } from 'react';

// =============================
// 🎭 Fade Blur Transition Hook
// =============================
export function useFadeBlur(images: any[], currentIndex: number) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(currentIndex);

  useEffect(() => {
    if (currentIndex !== displayIndex) {
      setIsTransitioning(true);
      
      // Fade out current image
      setTimeout(() => {
        setDisplayIndex(currentIndex);
        setIsTransitioning(false);
      }, 600); // Half of transition duration
    }
  }, [currentIndex, displayIndex]);

  return {
    displayIndex,
    isTransitioning,
    currentImage: images[displayIndex] || images[0]
  };
}
