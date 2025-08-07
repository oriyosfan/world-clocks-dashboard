'use client';

import { useLocalStorage } from '@/utils/local-storage';

import { STORAGE_KEYS } from '../consts/storage-keys';

export interface Clock {
  key: string;
  user: string;
}

/**
 * Custom hook for managing selected clocks with localStorage persistence
 */
export function useSelectedClocks() {
  const [selectedClocks, setSelectedClocks] = useLocalStorage<Clock[]>({
    key: STORAGE_KEYS.SELECTED_CLOCKS,
    defaultValue: [],
  });

  const addClock = (clock: Clock) => {
    setSelectedClocks((prev) => {
      // Prevent duplicates
      if (prev.some((c) => c.key === clock.key)) {
        return prev;
      }
      return [...prev, clock];
    });
  };

  const removeClock = (clockKey: string) => {
    setSelectedClocks((prev) => prev.filter((c) => c.key !== clockKey));
  };

  const clearClocks = () => {
    setSelectedClocks([]);
  };

  const hasClock = (clockKey: string) => {
    return selectedClocks.some((c) => c.key === clockKey);
  };

  return {
    selectedClocks,
    addClock,
    removeClock,
    clearClocks,
    hasClock,
    setSelectedClocks,
  };
}
