import type { ComponentProps } from '@/types';

// =============================
// 📄 Footer Component - Fullscreen Optimized
// =============================
export function Footer({ className = '' }: ComponentProps) {
  return (
    <div className={`footer-container ${className}`}>
      <div className="footer-text">
        Dados meteorológicos fornecidos por Open‑Meteo
      </div>
    </div>
  );
}