'use client';
import { useEffect, useState } from 'react';

import { useSelectedClocks } from '../hooks/useSelectedClocks';
import { getTimezoneOptions } from '../utils/timezoneOptions';

import { Card, type CardProps } from './Card';
import { SelectTimezone } from './SelectTimezone';

const tzOptions = getTimezoneOptions();

const getClockCardProps = (key: string, _forceTick: number): CardProps => {
  const tzOption = tzOptions.find((tz) => tz.key === key);
  if (!tzOption) {
    throw new Error(`Timezone option not found for key: ${key}`);
  }
  const time = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: tzOption.timezoneName,
  });
  return {
    time,
    country: tzOption.country,
    offset: tzOption.offsetStr,
    countryCode: tzOption.countryCode,
  };
};

export const Dashboard = () => {
  const [forceTick, setForceTick] = useState(0);

  const { selectedClocks, addClock, removeClock } = useSelectedClocks();
  const [selectedTimezone, setSelectedTimezone] = useState<string>('');

  const availableTimezones = tzOptions.filter((tz) => !selectedClocks.some((clock) => clock.key === tz.key));

  useEffect(() => {
    const timer = setInterval(() => {
      setForceTick((prev) => prev + 1);
      // TODO: is this the best way to update the time?
      // Look for react-hook-timer or similar or react-query
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="flex items-center justify-center p-4">
        <SelectTimezone
          options={availableTimezones}
          className="w-md"
          value={selectedTimezone}
          onChange={(v) => {
            setSelectedTimezone('');
            addClock({ key: v, user: 'me' });
          }}
        />
      </div>
      <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {selectedClocks.map((clock) => (
          <Card key={clock.key} {...getClockCardProps(clock.key, forceTick)} onClose={() => removeClock(clock.key)} />
        ))}
      </div>
    </>
  );
};
