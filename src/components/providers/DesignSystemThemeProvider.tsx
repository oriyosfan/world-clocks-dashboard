'use client';
import '@infra/antd-react19-compat';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState } from 'react';

import { ConfigProvider } from '@infra/bridge';

import { getAntdThemeConfig } from './theme/tokens';
import { ThemeMode, isThemeMode, type ThemeModeValue } from './theme/types';

import type { Decorator } from '@storybook/nextjs-vite';
import type { PropsWithChildren } from 'react';

export function DesignSystemThemeProvider({ children }: PropsWithChildren) {
  const { resolvedTheme } = useTheme();
  const [mode, setMode] = useState<ThemeModeValue>(ThemeMode.Light);

  useEffect(() => {
    setMode(isThemeMode(resolvedTheme) ? resolvedTheme : ThemeMode.Light);
  }, [resolvedTheme]);

  const themeConfig = useMemo(() => getAntdThemeConfig(mode), [mode]);

  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
}

export const StorybookWrapper: Decorator = (Story, context) => (
  <DesignSystemThemeProvider>{Story(context)}</DesignSystemThemeProvider>
);
