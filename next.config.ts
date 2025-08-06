import { createRequire } from 'node:module';

import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig, WebpackPluginInstance } from 'webpack';

const require = createRequire(import.meta.url);

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },

  // IMPORTANT: this function runs 3x (server-edge, server-node, client).
  // We only attach the ESLint plugin to the *client* build.
  webpack: (config: WebpackConfig, { dev, isServer }: { dev: boolean; isServer: boolean }): WebpackConfig => {
    if (dev && !isServer) {
      config.plugins ??= [];
      const eslintPlugin: WebpackPluginInstance = new ESLintPlugin({
        // Make sure it reads your flat config and lints all changed files
        configType: 'flat',
        context: process.cwd(),
        files: ['**/*.{ts,tsx,js,mjs,cjs}'],
        extensions: ['ts', 'tsx', 'js', 'mjs', 'cjs'],

        // Make lint issues become *compile* errors → overlay
        emitError: true,
        emitWarning: true,
        failOnError: false,
        failOnWarning: false,

        // Avoid stale results sticking around
        cache: false,
        lintDirtyModulesOnly: false, // force a real re-lint when you save

        eslintPath: require.resolve('eslint'),
        formatter: 'stylish',
      });
      const tsCheckerPlugin: WebpackPluginInstance = new ForkTsCheckerWebpackPlugin({
        async: false,
        typescript: { diagnosticOptions: { semantic: true, syntactic: true } },
      });
      config.plugins.push(eslintPlugin, tsCheckerPlugin);
    }

    return config;
  },
};

export default nextConfig;
