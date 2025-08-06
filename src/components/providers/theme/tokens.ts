import { theme } from '@infra/bridge';

import { ThemeMode, type ThemeModeValue } from './types';

import type { ConfigProvider } from '@infra/bridge';

type AntdThemeConfig = NonNullable<Parameters<typeof ConfigProvider>[0]['theme']>;
type AntdTokens = NonNullable<AntdThemeConfig['token']>;

/** Base tokens (both modes) — grow this as your brand evolves */
const baseToken: AntdTokens = {
  colorPrimary: '#1677ff',
  borderRadius: 8,
};

/** Mode-specific overlays */
const lightToken: AntdTokens = {
  colorBgBase: '#ffffff',
  colorTextBase: '#171717',
};

const darkToken: AntdTokens = {
  colorBgBase: '#0b0b0c',
  colorTextBase: '#f5f7fa',
};

/** Build final AntD theme for the given mode */
export function getAntdThemeConfig(mode: ThemeModeValue): AntdThemeConfig {
  const algorithm = mode === ThemeMode.Dark ? theme.darkAlgorithm : theme.defaultAlgorithm;
  const token = mode === ThemeMode.Dark ? { ...baseToken, ...darkToken } : { ...baseToken, ...lightToken };
  return { token, algorithm };
}
