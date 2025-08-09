'use client';

import { useEffect, useState } from 'react';

export function useClockTime(timeZone: string) {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone,
    }),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone,
        }),
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone]);

  return time;
}
