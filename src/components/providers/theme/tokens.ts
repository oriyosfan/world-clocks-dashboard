import { theme } from '@infra/bridge';

import { ThemeMode, type ThemeModeValue } from './types';

import type { ConfigProvider } from '@infra/bridge';

type AntdThemeConfig = NonNullable<Parameters<typeof ConfigProvider>[0]['theme']>;
type AntdTokens = NonNullable<AntdThemeConfig['token']>;

const baseToken: AntdTokens = {
  colorPrimary: '#1677ff',
  borderRadius: 8,
};

/** Mode-specific overlays */
const lightToken: AntdTokens = {
  colorBgBase: '#ffffff',
  colorBgContainer: '#ffffff',
  colorTextBase: '#171717',
};

const darkToken: AntdTokens = {
  colorBgBase: '#0b0b0c',
  colorBgContainer: '#43484f',
  colorTextBase: '#f5f7fa',
};

const lightCardToken: AntdTokens = {
  colorBgContainer: '#ffffff',
};

const darkCardToken: AntdTokens = {
  colorBgContainer: '#1d2229',
};

/** Build final AntD theme for the given mode */
export function getAntdThemeConfig(mode: ThemeModeValue): AntdThemeConfig {
  const algorithm = mode === ThemeMode.Dark ? theme.darkAlgorithm : theme.defaultAlgorithm;
  const token = mode === ThemeMode.Dark ? { ...baseToken, ...darkToken } : { ...baseToken, ...lightToken };

  // Component-level tweaks so the theme difference is obvious
  const components: NonNullable<AntdThemeConfig['components']> = {
    Card: {
      ...(mode === ThemeMode.Dark ? darkCardToken : lightCardToken),
    },
  };

  return { token, algorithm, components };
}
