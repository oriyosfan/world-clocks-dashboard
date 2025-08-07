import { ThemeMode, type ThemeModeValue } from '@/components/providers/theme/types';
import { Segmented } from '@/components/ui';

const ThemeToggleOptions: { label: string; value: ThemeModeValue }[] = [
  { label: '🌞 Light', value: ThemeMode.Light },
  { label: '🌙 Dark', value: ThemeMode.Dark },
];

export const ThemeToggleControl = ({
  value,
  setValue,
}: {
  value: ThemeModeValue;
  setValue: (value: string) => void;
}) => {
  return <Segmented value={value} onChange={(v) => setValue(v.toString())} options={ThemeToggleOptions} size="small" />;
};
