import * as ct from 'countries-and-timezones';

export interface TimezoneOption {
  key: string;
  country: string;
  offsetStr: string;
  minutesDiff: number;
  timezoneName: string;
  countryCode: string;
}

export const getTimezoneOptions = (): TimezoneOption[] => {
  const allCountries = ct.getAllCountries();
  const allTimezones = ct.getAllTimezones();

  const options = Object.entries(allCountries).map(([code, country]) => {
    const timezones = ct.getCountry(code)?.timezones;
    if (!timezones?.length) {
      return null;
    }

    const offsets: Record<number, boolean> = {};
    const contryOffsets = timezones
      .map((timezone) => {
        const tz = allTimezones[timezone];
        if (offsets[tz.utcOffset]) {
          return null;
        }
        offsets[tz.utcOffset] = true;
        return { minutesDiff: tz.utcOffset, offsetStr: tz.utcOffsetStr, timezoneName: tz.name, countryCode: code };
      })
      .filter((item) => item !== null)
      .sort((a, b) => Math.abs(a.minutesDiff) - Math.abs(b.minutesDiff));
    return {
      countryCode: code,
      country: country.name,
      offset: contryOffsets,
    };
  });
  const flattendOptions: TimezoneOption[] = options
    .filter((item) => item !== null)
    .flatMap(({ country, offset }) =>
      offset.map(({ minutesDiff, offsetStr, timezoneName, countryCode }) => {
        return {
          country,
          offsetStr,
          minutesDiff,
          countryCode,
          timezoneName,
          key: getTimezoneKey({ country, offsetStr }),
        };
      }),
    );

  return flattendOptions;
};

export const getTimezoneKey = ({ country, offsetStr }: { country: string; offsetStr: string }) => {
  return `${country}-${offsetStr}`;
};
