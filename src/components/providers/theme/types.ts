export const ThemeMode = {
  Light: 'light',
  Dark: 'dark',
};

export type ThemeModeType = (typeof ThemeMode)[keyof typeof ThemeMode];

export function isThemeMode(v: unknown): v is ThemeModeType {
  return v === ThemeMode.Light || v === ThemeMode.Dark;
}
