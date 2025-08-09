'use client';
import { ThemeMode, type ThemeModeValue } from '@/components/providers/theme/types';
import { Segmented } from '@/components/ui';

const ThemeToggleOptions: { label: string; value: ThemeModeValue }[] = [
  { label: '🌞 Light', value: ThemeMode.Light },
  { label: '🌙 Dark', value: ThemeMode.Dark },
];

export const ThemeToggleControl = ({
  value,
  setValueAction,
}: {
  value: ThemeModeValue;
  setValueAction: (value: string) => void;
}) => {
  return (
    <Segmented value={value} onChange={(v) => setValueAction(v.toString())} options={ThemeToggleOptions} size="small" />
  );
};
