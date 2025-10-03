import { useState, useEffect } from 'react';
import type { ClockData } from '@/types';
import { HOTEL_CONFIG, TIMING_CONFIG } from '@/config/constants';

// =============================
// 🕰️ Clock Hook
// =============================
export function useClock(): ClockData {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, TIMING_CONFIG.TIME_TICK_MS);

    return () => clearInterval(intervalId);
  }, []);

  const dateStr = now.toLocaleDateString("pt-PT", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: HOTEL_CONFIG.timezone,
  });

  const timeStr = now.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: HOTEL_CONFIG.timezone,
  });

  return { dateStr, timeStr };
}
