import type { ClockData, ComponentProps } from '@/types';

// =============================
// 🕰️ Clock Display Component
// =============================
interface ClockDisplayProps extends ComponentProps {
  clockData: ClockData;
}

export function ClockDisplay({ clockData, className = '' }: ClockDisplayProps) {
  const { dateStr, timeStr } = clockData;

  return (
    <div className={`text-right ${className}`}>
      <div className="text-[46px] sm:text-6xl font-bold tabular-nums leading-none drop-shadow-[0_2px_0_rgba(0,0,0,0.25)]">
        {timeStr}
      </div>
      <div className="text-sm opacity-80">{dateStr}</div>
    </div>
  );
}
