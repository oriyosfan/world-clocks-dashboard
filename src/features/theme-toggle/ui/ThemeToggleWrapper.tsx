import { useTheme } from 'next-themes';

import { ThemeMode, type ThemeModeValue } from '@/components/providers/theme/types';
import { ClientOnly } from '@/components/util/ClientOnly';

import { ThemeToggleControl } from './ThemeToggleControl';

export const ThemeToggleWrapper = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const value: ThemeModeValue = resolvedTheme === ThemeMode.Dark ? ThemeMode.Dark : ThemeMode.Light;
  return (
    <ClientOnly>
      <ThemeToggleControl key={value} value={value} setValue={setTheme} />
    </ClientOnly>
  );
};
