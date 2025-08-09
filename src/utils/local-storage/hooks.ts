'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { createLocalStorage, type LocalStorageConfig } from './core';

/**
 * React hook for localStorage with SSR support
 * Returns a stateful value and a function to update it
 */
export function useLocalStorage<T>(config: LocalStorageConfig<T>) {
  const { key, defaultValue } = config;
  const storageRef = useRef(createLocalStorage(config));

  // Initialize state with defaultValue (will be overridden on mount)
  const [value, setValue] = useState<T>(defaultValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedValue = storageRef.current.get();
    setValue(storedValue);
    setIsInitialized(true);
  }, [key]);

  // Update localStorage when value changes
  const setStoredValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      let valueToStore: T;
      if (typeof newValue === 'function') {
        // we need to cast to a function type because the type checker is not smart enough to know that the type of newValue is a function
        // eslint-disable-next-line no-restricted-syntax
        const updater = newValue as (prev: T) => T;
        valueToStore = updater(value);
      } else {
        valueToStore = newValue;
      }
      setValue(valueToStore);

      // Only save to localStorage after initialization to avoid overwriting with defaultValue
      if (isInitialized) {
        storageRef.current.set(valueToStore);
      }
    },
    [value, isInitialized],
  );

  return [value, setStoredValue] satisfies [T, (newValue: T | ((prev: T) => T)) => void];
}

/**
 * Hook that returns the current value from localStorage without state updates
 * Useful for read-only access or when you don't need reactivity
 */
export function useLocalStorageValue<T>(config: LocalStorageConfig<T>) {
  const storageRef = useRef(createLocalStorage(config));
  const [value, setValue] = useState<T>(config.defaultValue);

  useEffect(() => {
    setValue(storageRef.current.get());
  }, [config.key]);

  return value;
}
