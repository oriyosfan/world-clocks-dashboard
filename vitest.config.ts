import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  resolve: {
    alias: {
      '@': path.join(dirname, 'src'),
      '@ui': path.join(dirname, 'src/components/ui'),
      '@infra': path.join(dirname, 'src/components/infra'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: { reporter: ['text', 'html'] },
    include: ['src/**/*.{test,spec}.{ts,tsx,js,jsx}'],
  },
});
