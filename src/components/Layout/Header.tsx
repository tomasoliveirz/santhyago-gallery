import { MapPin } from 'lucide-react';
import { BRAND_CONFIG, HOTEL_CONFIG } from '@/config/constants';
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
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      {/* Left: Hotel Info with Real Logo */}
      <div className="flex items-center gap-6">
        <div className="h-16 w-16 rounded-2xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center p-2">
          <img 
            src="/logo.png" 
            alt="Hotel Santhyago Logo" 
            className="h-full w-full object-contain"
          />
        </div>
        <div className="leading-tight">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-white">{HOTEL_CONFIG.name}</span>
          </h1>
          <div 
            className="flex items-center gap-2 text-base font-medium" 
            style={{ color: BRAND_CONFIG.gold }}
          >
            <MapPin className="w-5 h-5" /> 
            {HOTEL_CONFIG.city}
          </div>
        </div>
      </div>

      {/* Right: Clock */}
      <ClockDisplay clockData={clockData} />
    </div>
  );
}
