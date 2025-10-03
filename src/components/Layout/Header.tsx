import { MapPin } from 'lucide-react';
import { HOTEL_CONFIG } from '@/config/constants';
import { ClockDisplay } from '@/components/Clock/ClockDisplay';
import type { ClockData, ComponentProps } from '@/types';

// =============================
// 🏨 Header Component - Fullscreen Optimized
// =============================
interface HeaderProps extends ComponentProps {
  clockData: ClockData;
}

export function Header({ clockData, className = '' }: HeaderProps) {
  return (
    <div className={`header-container ${className}`}>
      {/* Left: Hotel Info with Real Logo */}
      <div className="flex items-center gap-3 md:gap-6">
        <div className="hotel-logo">
          <img 
            src="/logo.png" 
            alt="Hotel Santhyago Logo" 
            className="h-full w-full object-contain"
          />
        </div>
        <div className="leading-tight">
          <h1 className="hotel-title">
            {HOTEL_CONFIG.name}
          </h1>
          <div className="hotel-location">
            <MapPin className="w-4 h-4 md:w-5 md:h-5" /> 
            {HOTEL_CONFIG.city}
          </div>
        </div>
      </div>

      {/* Right: Clock */}
      <ClockDisplay clockData={clockData} />
    </div>
  );
}