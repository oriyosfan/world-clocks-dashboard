'use client';
import { useCallback, useMemo, useState } from 'react';

import { useSelectedClocks } from '../hooks/useSelectedClocks';
import { getTimezoneOptions } from '../utils/timezoneOptions';

import { ClockCard } from './ClockCard';
import { SelectTimezone } from './SelectTimezone';
import { TagUserModal } from './TagUserModal';

const tzOptions = getTimezoneOptions();

const tzMap = new Map(tzOptions.map((o) => [o.key, o]));

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClockKey, setSelectedClockKey] = useState<string>('');

  const { selectedClocks, addClock, removeClock, updateClockUser } = useSelectedClocks();
  const [selectedTimezone, setSelectedTimezone] = useState<string>('');

  const availableTimezones = useMemo(
    () => tzOptions.filter((tz) => !selectedClocks.some((clock) => clock.key === tz.key)),
    [selectedClocks],
  );

  const handleCardClick = useCallback((clockKey: string) => {
    setSelectedClockKey(clockKey);
    setModalOpen(true);
  }, []);

  const handleModalOk = useCallback(
    (user: string) => {
      if (selectedClockKey) {
        updateClockUser(selectedClockKey, user);
      }
      setModalOpen(false);
      setSelectedClockKey('');
    },
    [selectedClockKey, updateClockUser],
  );

  const handleModalCancel = useCallback(() => {
    setModalOpen(false);
    setSelectedClockKey('');
  }, []);

  const selectedClock = selectedClocks.find((clock) => clock.key === selectedClockKey);
  const selectedClockOption = selectedClock ? tzMap.get(selectedClock.key) : null;

  return (
    <>
      <div className="flex items-center justify-center p-4" data-cy="timezone-select-container">
        <SelectTimezone
          options={availableTimezones}
          className="w-md"
          value={selectedTimezone}
          onChange={(v) => {
            if (v) {
              addClock({ key: v, user: '' });
            }
            setSelectedTimezone('');
          }}
        />
      </div>
      <div
        data-cy="clocks-grid"
        key={selectedClocks.length} // To sync the ticks to act together
        className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        {selectedClocks.map((clock) => (
          <ClockCard
            key={clock.key}
            user={clock.user}
            clockKey={clock.key}
            onClose={() => removeClock(clock.key)}
            onClick={() => handleCardClick(clock.key)}
          />
        ))}
      </div>

      {selectedClockOption && (
        <TagUserModal
          open={modalOpen}
          onCancel={handleModalCancel}
          onOk={handleModalOk}
          currentUser={selectedClock?.user}
          clockCountry={selectedClockOption.country}
        />
      )}
    </>
  );
};
