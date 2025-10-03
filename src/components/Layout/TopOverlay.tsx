import { HOTEL_CONFIG } from '@/config/constants';
import { ClockDisplay } from '@/components/Clock/ClockDisplay';
import type { ClockData, ComponentProps } from '@/types';

// =============================
// 🏨 Top Overlay - Minimal Brand & Clock
// =============================
interface TopOverlayProps extends ComponentProps {
  clockData: ClockData;
}

export function TopOverlay({ clockData, className = '' }: TopOverlayProps) {
  return (
    <div className={`top-overlay ${className}`}>
      <div className="flex items-center justify-between">
        {/* Left: Hotel Brand */}
        <div className="hotel-brand">
          <div className="hotel-logo">
            <img 
              src="/logo.png" 
              alt="Hotel Santhyago Trofa Logo" 
            />
          </div>
          <div className="hotel-name">
            {HOTEL_CONFIG.name}
          </div>
        </div>

        {/* Right: Clock */}
        <div className="clock-section">
          <ClockDisplay clockData={clockData} />
        </div>
      </div>
    </div>
  );
}
