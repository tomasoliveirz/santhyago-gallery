import type { ComponentProps } from '@/types';

// =============================
// 📄 Footer Component
// =============================
export function Footer({ className = '' }: ComponentProps) {
  return (
    <div className={`mt-4 text-xs opacity-50 text-center ${className}`}>
      Dados meteorológicos fornecidos por Open‑Meteo
    </div>
  );
}
