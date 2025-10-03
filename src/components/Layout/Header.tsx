import { MapPin } from 'lucide-react';
import { BRAND_CONFIG, HOTEL_CONFIG } from '@/config/constants';
import { HotelLogo } from '@/components/UI/HotelLogo';
import { ClockDisplay } from '@/components/Clock/ClockDisplay';
import type { ClockData, ComponentProps } from '@/types';

// =============================
// 🏨 Header Component
// =============================
interface HeaderProps extends ComponentProps {
  clockData: ClockData;
}

export function Header({ clockData, className = '' }: HeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      {/* Left: Hotel Info */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-[#141414] ring-1 ring-white/10 flex items-center justify-center">
          <HotelLogo size="md" />
        </div>
        <div className="leading-tight">
          <h1 className="text-2xl font-semibold tracking-tight">
            <span className="text-white">{HOTEL_CONFIG.name}</span>
          </h1>
          <div 
            className="flex items-center gap-2 text-sm" 
            style={{ color: BRAND_CONFIG.gold }}
          >
            <MapPin className="w-4 h-4" /> 
            {HOTEL_CONFIG.city}
          </div>
        </div>
      </div>

      {/* Right: Clock */}
      <ClockDisplay clockData={clockData} />
    </div>
  );
}
