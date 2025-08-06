// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

// Scope the typed presets to TS files only
const typeCheckedTS = tseslint.configs.recommendedTypeChecked.map((c) => ({
  ...c,
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    ...(c.languageOptions ?? {}),
    parserOptions: {
      ...((c.languageOptions && c.languageOptions.parserOptions) ?? {}),
      projectService: true,
      tsconfigRootDir: __dirname,
    },
  },
}));
const stylisticTypeCheckedTS = tseslint.configs.stylisticTypeChecked.map((c) => ({
  ...c,
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    ...(c.languageOptions ?? {}),
    parserOptions: {
      ...((c.languageOptions && c.languageOptions.parserOptions) ?? {}),
      projectService: true,
      tsconfigRootDir: __dirname,
    },
  },
}));

// disable this rule because it is a special file that is used to configure the eslint rules and it has to be a default export
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  // 0) Ignore build artifacts
  { ignores: ['.next/**', 'node_modules/**', 'dist/**', 'build/**', 'coverage/**'] },

  // 1) Base JS rules
  js.configs.recommended,

  // 2) Next.js shareable configs via FlatCompat
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),

  // 3) TypeScript strict + typed presets (TS ONLY)
  ...typeCheckedTS,
  ...stylisticTypeCheckedTS,

  // 4) TS/TSX files — your strict rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: { prettier: prettierPlugin },
    rules: {
      // Import hygiene
      'import/no-default-export': 'error',
      'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc', caseInsensitive: true } }],

      // TS strictness (type-aware)
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true, allowHigherOrderFunctions: true },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],

      // General
      'no-console': ['error', { allow: ['warn', 'error'] }],

      // Prettier as errors
      'prettier/prettier': 'error',
    },
  },

  // 5) JS/MJS/CJS files — typed linting OFF (prevents crashes in config files)
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { projectService: false },
    },
    plugins: { prettier: prettierPlugin },
    rules: {
      'import/no-default-export': 'error',
      'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc', caseInsensitive: true } }],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'prettier/prettier': 'error',

      // Belt & suspenders: disable typed rules here (in case any leak through)
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
    },
  },

  // 6) Next special files: allow default export + relax a few rules
  {
    files: [
      'src/app/**/page.tsx',
      'src/app/**/layout.tsx',
      'src/app/**/template.tsx',
      'src/app/**/loading.tsx',
      'src/app/**/not-found.tsx',
      'src/app/**/error.tsx',
      'src/pages/**/*.{ts,tsx}',
      'eslint.config.mjs',
      'postcss.config.mjs',
      'next.config.ts',
    ],
    rules: {
      'no-console': 'off',
      'import/no-default-export': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  // 7) Keep Prettier last to disable conflicting rules
  prettierConfig,
];
