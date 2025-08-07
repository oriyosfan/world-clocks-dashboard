'use client';

import { useTheme } from 'next-themes';

import { ThemeMode, type ThemeModeValue } from '@/components/providers/theme/types';

import { ThemeToggleControl } from './ThemeToggleControl';

export const ThemeToggleWrapper = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const value: ThemeModeValue = resolvedTheme === ThemeMode.Dark ? ThemeMode.Dark : ThemeMode.Light;
  return <ThemeToggleControl value={value} setValue={setTheme} />;
};
