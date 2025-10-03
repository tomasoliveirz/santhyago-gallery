import { BRAND_CONFIG } from '@/config/constants';
import type { ComponentProps } from '@/types';

// =============================
// 🏨 Hotel Logo Component
// =============================
interface HotelLogoProps extends ComponentProps {
  size?: 'sm' | 'md' | 'lg';
}

export function HotelLogo({ className = '', size = 'md' }: HotelLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <svg 
      viewBox="0 0 64 64" 
      className={`${sizeClasses[size]} ${className}`} 
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hotel-logo-gradient" x1="0" x2="1">
          <stop offset="0%" stopColor={BRAND_CONFIG.gold} />
          <stop offset="100%" stopColor={BRAND_CONFIG.goldDeep} />
        </linearGradient>
      </defs>
      
      {/* Main building structure */}
      <path 
        fill="url(#hotel-logo-gradient)" 
        d="M12 50h40a2 2 0 0 0 2-2V28a2 2 0 0 0-2-2H34V14a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v12H12a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2z" 
      />
      
      {/* Windows */}
      <circle 
        cx="20" 
        cy="34" 
        r="3" 
        fill={BRAND_CONFIG.white} 
        opacity="0.9" 
      />
      <rect 
        x="28" 
        y="34" 
        width="8" 
        height="10" 
        rx="1" 
        fill={BRAND_CONFIG.white} 
        opacity="0.9" 
      />
      <rect 
        x="40" 
        y="32" 
        width="8" 
        height="12" 
        rx="1" 
        fill={BRAND_CONFIG.white} 
        opacity="0.9" 
      />
    </svg>
  );
}
