import type { ComponentProps } from '@/types';

// =============================
// 📄 Footer Component
// =============================
export function Footer({ className = '' }: ComponentProps) {
  return (
    <div className={`mt-3 text-xs opacity-60 ${className}`}>
      Meteorologia: Open‑Meteo · Atualização automática
    </div>
  );
}
