/**
 * Type-safe localStorage utility with error handling
 */

export interface LocalStorageConfig<T> {
  key: string;
  defaultValue: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}

export class LocalStorageError extends Error {
  constructor(
    message: string,
    public readonly originalError?: Error,
  ) {
    super(message);
    this.name = 'LocalStorageError';
  }
}

/**
 * Creates a localStorage manager for a specific key with type safety
 */
export function createLocalStorage<T>(config: LocalStorageConfig<T>) {
  const { key, defaultValue, serialize = JSON.stringify, deserialize = JSON.parse } = config;

  const get = (): T => {
    try {
      if (typeof window === 'undefined') {
        return defaultValue;
      }

      const item = window.localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }

      // eslint-disable-next-line no-restricted-syntax
      return deserialize(item) as T;
    } catch (error) {
      console.warn(`Failed to read from localStorage key "${key}":`, error);
      return defaultValue;
    }
  };

  const set = (value: T): void => {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      const serialized = serialize(value);
      window.localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Failed to write to localStorage key "${key}":`, error);
      throw new LocalStorageError(
        `Failed to write to localStorage key "${key}"`,
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  };

  const remove = (): void => {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove localStorage key "${key}":`, error);
      throw new LocalStorageError(
        `Failed to remove localStorage key "${key}"`,
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  };

  const clear = (): void => {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      window.localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
      throw new LocalStorageError(
        'Failed to clear localStorage',
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  };

  return {
    get,
    set,
    remove,
    clear,
    key,
  };
}
