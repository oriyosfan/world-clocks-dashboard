import { makeMap } from '@/utils/type-helpers';

export const ThemeMode = makeMap({
  Dark: 'dark',
  Light: 'light',
});

export type ThemeModeKey = keyof typeof ThemeMode;
export type ThemeModeValue = (typeof ThemeMode)[ThemeModeKey];

export function isThemeMode(v: unknown): v is ThemeModeValue {
  return v === ThemeMode.Light || v === ThemeMode.Dark;
}
