import { describe, expect, it, vi, beforeEach } from 'vitest';

import { createLocalStorage, LocalStorageError } from './core';

describe('local-storage core', () => {
  const key = 'test-key';
  const defaultValue = { a: 1 };

  beforeEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(global, 'window', {
      value: {
        localStorage: {
          getItem: vi.fn(() => null),
          setItem: vi.fn(),
          removeItem: vi.fn(),
          clear: vi.fn(),
        },
      },
      writable: true,
    });
  });

  it('returns default on missing item', () => {
    const ls = createLocalStorage({ key, defaultValue });
    expect(ls.get()).toEqual(defaultValue);
  });

  it('writes and reads value', () => {
    const ls = createLocalStorage({ key, defaultValue });
    ls.set({ a: 2 });
    expect(window.localStorage.setItem).toHaveBeenCalled();

    window.localStorage.getItem.mockReturnValue(JSON.stringify({ a: 2 }));
    expect(ls.get()).toEqual({ a: 2 });
  });

  it('wraps write errors in LocalStorageError', () => {
    window.localStorage.setItem.mockImplementation(() => {
      throw new Error('This is a test error, as expected');
    });
    const ls = createLocalStorage({ key, defaultValue });
    expect(() => ls.set({ a: 3 })).toThrow(LocalStorageError);
  });
});
