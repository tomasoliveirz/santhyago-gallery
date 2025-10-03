import { useState, useEffect } from 'react';

// =============================
// 🎭 Fade Out → Fade In Transition Hook
// =============================
export function useFadeTransition(images: any[], currentIndex: number) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(currentIndex);
  const [transitionPhase, setTransitionPhase] = useState<'fade-in' | 'fade-out'>('fade-in');

  useEffect(() => {
    if (currentIndex !== displayIndex) {
      // Start fade out
      setTransitionPhase('fade-out');
      setIsTransitioning(true);
      
      // After fade out completes, change image and start fade in
      setTimeout(() => {
        setDisplayIndex(currentIndex);
        setTransitionPhase('fade-in');
        
        // After fade in completes, stop transitioning
        setTimeout(() => {
          setIsTransitioning(false);
        }, 750); // Half of 1.5s transition
      }, 750); // Half of 1.5s transition
    }
  }, [currentIndex, displayIndex]);

  return {
    displayIndex,
    isTransitioning,
    transitionPhase,
    currentImage: images[displayIndex] || images[0]
  };
}
