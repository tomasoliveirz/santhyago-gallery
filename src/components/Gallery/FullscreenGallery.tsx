import { useEffect, useRef, useState } from 'react';
import type { GalleryProps } from '@/types';

// =============================
// 🎞️ Fullscreen Gallery - Deterministic Cross-Fade (no transforms)
// =============================

const ease = "cubic-bezier(0.22, 0.0, 0.0, 1)"; // suave/premium

export function FullscreenGallery({ images, config, className = '' }: GalleryProps) {
  const holdMs = config?.slideInterval || 7000;
  const fadeMs = 2500; // cross-fade lento e suave

  const [showA, setShowA] = useState(true);
  const showRef = useRef(true);
  const [srcA, setSrcA] = useState(images[0]?.url || "");
  const [srcB, setSrcB] = useState(images[1]?.url || "");
  const currentIndexRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  // Preload helper
  const preload = (url: string) =>
    new Promise<void>((resolve) => {
      if (!url) return resolve();
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // não bloquear
      img.src = url;
    });

  // Atualiza ref quando o estado muda
  useEffect(() => {
    showRef.current = showA;
  }, [showA]);

  // Reinicializa quando as imagens mudarem
  useEffect(() => {
    // limpa qualquer timer pendente
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!images || images.length === 0) return;

    // setup inicial determinístico
    currentIndexRef.current = 0;
    setShowA(true);
    setSrcA(images[0]?.url || "");
    setSrcB(images[(0 + 1) % images.length]?.url || "");

    const runStep = async () => {
      // espera a exposição completa
      await new Promise<void>(resolve => {
        timerRef.current = window.setTimeout(() => resolve(), holdMs);
      });

      // calcula próximo índice e pre-carrega
      const nextIdx = (currentIndexRef.current + 1) % images.length;
      const nextUrl = images[nextIdx]?.url || "";
      await preload(nextUrl);

      // coloca a próxima imagem na camada escondida com base no estado ATUAL
      const showingA = showRef.current;
      if (showingA) {
        setSrcB(nextUrl);
      } else {
        setSrcA(nextUrl);
      }

      // dispara cross-fade simultâneo
      await new Promise<void>(resolve => {
        requestAnimationFrame(() => {
          setShowA(prev => {
            const next = !prev;
            showRef.current = next;
            return next;
          });
          // aguarda o fade terminar
          timerRef.current = window.setTimeout(() => resolve(), fadeMs);
        });
      });

      // finaliza troca: atualiza índice atual
      currentIndexRef.current = nextIdx;

      // agenda próximo ciclo
      runStep();
    };

    // inicia ciclo
    runStep();

    // cleanup on unmount or images change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
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
          transition: `opacity var(--fadeMs) var(--ease)`,
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
          transition: `opacity var(--fadeMs) var(--ease)`,
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