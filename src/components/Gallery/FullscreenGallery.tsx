import { useEffect, useRef, useState } from 'react';
import type { GalleryProps } from '@/types';

// =============================
// 🎞️ Fullscreen Gallery - True Cross-Fade
// =============================

const ease = "cubic-bezier(0.22, 0.0, 0.0, 1)"; // suave/premium

export function FullscreenGallery({ images, config, className = '' }: GalleryProps) {
  const holdMs = config?.slideInterval || 7000;
  const fadeMs = 2500; // cross-fade lento e suave

  const [showA, setShowA] = useState(true);
  const [srcA, setSrcA] = useState(images[0]?.url || "");
  const [srcB, setSrcB] = useState(images[1]?.url || "");
  const timers = useRef<number[]>([]);
  const currentIndexRef = useRef(0);

  // Preload helper
  const preload = (url: string) =>
    new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = url;
    });

  useEffect(() => {
    if (!images || images.length === 0) return;
    if (images.length === 1) {
      // Se só houver uma imagem, mostra ela
      setSrcA(images[0].url);
      setShowA(true);
      return;
    }

    let nextIdx = 1; // começamos da segunda imagem

    const loop = async () => {
      // 1) aguarda o tempo de exposição (imagem parada e visível)
      await new Promise(resolve => {
        timers.current.push(window.setTimeout(resolve, holdMs));
      });

      // 2) prepara próxima imagem (preload para evitar flash)
      const nextUrl = images[nextIdx]?.url;
      if (!nextUrl) return;

      try { 
        await preload(nextUrl); 
      } catch (err) {
        console.warn('Erro ao carregar imagem:', nextUrl);
      }

      // 3) coloca a próxima no layer escondido
      if (showA) {
        setSrcB(nextUrl);
      } else {
        setSrcA(nextUrl);
      }

      // 4) dispara o cross-fade (ambas transições em simultâneo)
      await new Promise(resolve => {
        requestAnimationFrame(() => {
          setShowA(v => !v);
          currentIndexRef.current = nextIdx;
          // aguarda o fade terminar completamente
          timers.current.push(window.setTimeout(resolve, fadeMs));
        });
      });

      // 5) avança o ponteiro e recomeça
      nextIdx = (nextIdx + 1) % images.length;
      loop();
    };

    loop();

    return () => {
      // limpa timers ao desmontar
      timers.current.forEach(t => clearTimeout(t));
      timers.current = [];
    };
  }, [images, holdMs, fadeMs]);

  if (!images || images.length === 0) {
    return (
      <div className={`gallery-container bg-black flex items-center justify-center ${className}`}>
        <div className="text-white text-lg opacity-60">Carregando galeria...</div>
      </div>
    );
  }

  return (
    <div
      className={`gallery-container ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        // @ts-ignore - CSS custom properties
        "--fadeMs": `${fadeMs}ms`,
        "--ease": ease,
      }}
    >
      {/* Layer A */}
      <img
        src={srcA}
        alt=""
        aria-hidden="true"
        className="slide slide-a"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: showA ? 1 : 0,
          transform: showA ? "scale(1)" : "scale(1.015)",
          transition: `opacity var(--fadeMs) var(--ease), transform var(--fadeMs) linear`,
        }}
      />

      {/* Layer B */}
      <img
        src={srcB}
        alt=""
        aria-hidden="true"
        className="slide slide-b"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: showA ? 0 : 1,
          transform: showA ? "scale(1.015)" : "scale(1)",
          transition: `opacity var(--fadeMs) var(--ease), transform var(--fadeMs) linear`,
        }}
      />

      {/* Gradiente para legibilidade dos overlays */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.10) 70%, rgba(0,0,0,0.35) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Gallery Indicators - Minimal */}
      {images.length > 1 && (
        <div className="gallery-indicators">
          {images.map((_, index) => (
            <div
              key={index}
              className={`gallery-dot ${
                index === currentIndexRef.current ? 'active' : ''
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}