'use client';
import '@infra/antd-react19-compat';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState } from 'react';

import { ConfigProvider } from '@infra/bridge';

import { getAntdThemeConfig } from './theme/tokens';
import { ThemeMode, isThemeMode, type ThemeModeType } from './theme/types';

import type { PropsWithChildren } from 'react';

export function DesignSystemThemeProvider({ children }: PropsWithChildren) {
  const { resolvedTheme } = useTheme();
  const [mode, setMode] = useState<ThemeModeType>(ThemeMode.Light);

  useEffect(() => {
    setMode(isThemeMode(resolvedTheme) ? resolvedTheme : ThemeMode.Light);
  }, [resolvedTheme]);

  const themeConfig = useMemo(() => getAntdThemeConfig(mode), [mode]);

  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
}
