'use client';

import { useTheme } from 'next-themes';

import { ThemeMode, type ThemeModeType } from '@/components/providers/theme/types';
import { Segmented } from '@/components/ui';
import { ClientOnly } from '@/components/util/ClientOnly';

const ThemeToggleOptions: { label: string; value: ThemeModeType }[] = [
  { label: '🌞 Light', value: ThemeMode.Light },
  { label: '🌙 Dark', value: ThemeMode.Dark },
];

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const value: ThemeModeType = resolvedTheme === ThemeMode.Dark ? ThemeMode.Dark : ThemeMode.Light;
  return <Segmented value={value} onChange={(v) => setTheme(v.toString())} options={ThemeToggleOptions} size="small" />;
};

export const ThemeToggleControl = () => {
  // This is a workaround to avoid the SSR-render.
  return (
    <ClientOnly>
      <ThemeToggle />
    </ClientOnly>
  );
};
