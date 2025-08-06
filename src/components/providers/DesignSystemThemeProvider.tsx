'use client';

import { useTheme } from 'next-themes';
import type { PropsWithChildren } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { getAntdThemeConfig } from './theme/tokens';
import { ThemeMode, isThemeMode, type ThemeModeType } from './theme/types';

import { ConfigProvider } from '@infra/antd-bridge';

export function DesignSystemThemeProvider({ children }: PropsWithChildren) {
  const { resolvedTheme } = useTheme();
  const [mode, setMode] = useState<ThemeModeType>(ThemeMode.Light);

  useEffect(() => {
    setMode(isThemeMode(resolvedTheme) ? resolvedTheme : ThemeMode.Light);
  }, [resolvedTheme]);

  const themeConfig = useMemo(() => getAntdThemeConfig(mode), [mode]);

  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
}
