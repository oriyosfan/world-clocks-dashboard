import { ThemeMode, type ThemeModeType } from './types';

import { antdTheme } from '@infra/antd-bridge';
import type { ConfigProvider } from '@infra/antd-bridge'; // ← type group last
// Infer AntD ThemeConfig from ConfigProvider props (keeps types aligned with your antd version)
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
export function getAntdThemeConfig(mode: ThemeModeType): AntdThemeConfig {
  const algorithm = mode === ThemeMode.Dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;
  const token = mode === ThemeMode.Dark ? { ...baseToken, ...darkToken } : { ...baseToken, ...lightToken };
  return { token, algorithm };
}
