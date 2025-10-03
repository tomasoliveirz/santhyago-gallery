import type { ClockData, ComponentProps } from '@/types';

// =============================
// 🕰️ Clock Display Component - Fullscreen Optimized
// =============================
interface ClockDisplayProps extends ComponentProps {
  clockData: ClockData;
}

export function ClockDisplay({ clockData, className = '' }: ClockDisplayProps) {
  const { dateStr, timeStr } = clockData;

  return (
    <div className={`clock-display ${className}`}>
      <div className="clock-time">
        {timeStr}
      </div>
      <div className="clock-date">{dateStr}</div>
    </div>
  );
}