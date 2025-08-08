import { describe, expect, it, vi, beforeEach } from 'vitest';

vi.mock('countries-and-timezones', () => {
  const mockCountries = {
    FR: { name: 'France' },
    US: { name: 'United States' },
  };
  const mockTimezones = {
    'Europe/Paris': { name: 'Europe/Paris', utcOffset: 120, utcOffsetStr: '+02:00' },
    'America/New_York': { name: 'America/New_York', utcOffset: -240, utcOffsetStr: '-04:00' },
    'America/Detroit': { name: 'America/Detroit', utcOffset: -240, utcOffsetStr: '-04:00' },
  };
  return {
    getAllCountries: () => mockCountries,
    getAllTimezones: () => mockTimezones,
    getCountry: (code) => {
      if (code === 'FR') {
        return { timezones: ['Europe/Paris'] };
      }
      if (code === 'US') {
        return { timezones: ['America/New_York', 'America/Detroit'] };
      }
      return { timezones: [] };
    },
  };
});

import { getTimezoneKey, getTimezoneOptions } from './timezoneOptions';

describe('timezone utils', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('getTimezoneKey returns stable key', () => {
    expect(getTimezoneKey({ country: 'France', offsetStr: '+02:00' })).toBe('France-+02:00');
  });

  it('getTimezoneOptions flattens countries and dedupes offsets', () => {
    const result = getTimezoneOptions();

    expect(result).toHaveLength(2);

    for (const item of result) {
      expect(item).toEqual(
        expect.objectContaining({
          key: expect.any(String),
          country: expect.any(String),
          offsetStr: expect.any(String),
          minutesDiff: expect.any(Number),
          timezoneName: expect.any(String),
          countryCode: expect.any(String),
        }),
      );
    }

    const usEntries = result.filter((r) => r.countryCode === 'US');
    expect(usEntries).toHaveLength(1);
    expect(usEntries[0].timezoneName).toBe('America/New_York');
  });
});
