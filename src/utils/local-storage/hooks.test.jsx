import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useLocalStorage, useLocalStorageValue } from './hooks';

describe('useLocalStorage hooks', () => {
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

  it('initializes with default and persists updates', () => {
    const { result } = renderHook(() => useLocalStorage({ key: 'k', defaultValue: { count: 0 } }));

    expect(result.current[0]).toEqual({ count: 0 });

    act(() => {
      result.current[1]({ count: 1 });
    });

    act(() => {
      result.current[1]({ count: 2 });
    });

    expect(window.localStorage.setItem).toHaveBeenCalled();
    expect(result.current[0]).toEqual({ count: 2 });
  });

  it('useLocalStorageValue reads current value', () => {
    window.localStorage.getItem.mockReturnValue(JSON.stringify({ ready: true }));
    const { result } = renderHook(() => useLocalStorageValue({ key: 'k2', defaultValue: { ready: false } }));
    expect(result.current).toEqual({ ready: true });
  });
});
