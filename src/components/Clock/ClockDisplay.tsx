import type { ClockData, ComponentProps } from '@/types';

// =============================
// 🕰️ Clock Display - Premium Style
// =============================
interface ClockDisplayProps extends ComponentProps {
  clockData: ClockData;
}

export function ClockDisplay({ clockData, className = '' }: ClockDisplayProps) {
  const { dateStr, timeStr } = clockData;

  return (
    <div className={`clock-section ${className}`}>
      <div className="clock-time">
        {timeStr}
      </div>
      <div className="clock-date">{dateStr}</div>
    </div>
  );
}