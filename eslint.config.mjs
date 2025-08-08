// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import storybook from 'eslint-plugin-storybook';
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
  // Ignore build artifacts
  { ignores: ['.next/**', 'node_modules/**', 'dist/**', 'build/**', 'coverage/**', 'cypress/**'] },

  // Base JS rules
  js.configs.recommended,

  // Next.js shareable configs via FlatCompat
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),

  // TypeScript strict + typed presets (TS ONLY)
  ...typeCheckedTS,
  ...stylisticTypeCheckedTS,

  // 4) TS/TSX files — strict & minimal (no `as`, no `any` leaks, safe promises)
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
      'object-shorthand': ['error', 'always', { avoidQuotes: true }],

      // Import hygiene
      'import/no-default-export': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // TS strictness (type-aware)
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],

      // Disallow `as` assertions (but NOT `as const`)
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSAsExpression',
          message:
            'Avoid `as` assertions. Use proper typing, generics, narrowing, or the `satisfies` operator. `as const` is OK.',
        },
      ],
      // Forbid non-null assertions `!`
      '@typescript-eslint/no-non-null-assertion': 'error',
      // Block unsafe `any` flows
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      // Promise correctness
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksConditionals: true,
          checksVoidReturn: { attributes: false }, // keeps React handlers ergonomic
        },
      ],

      // Prettier as errors
      'prettier/prettier': 'error',
    },
  },

  // JS/MJS/CJS files — typed linting OFF (prevents crashes in config files)
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { projectService: false },
    },
    plugins: { prettier: prettierPlugin },
    rules: {
      'object-shorthand': ['error', 'always', { avoidQuotes: true }],
      'import/no-default-export': 'error',
      'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc', caseInsensitive: true } }],
      'prettier/prettier': 'error',

      // Belt & suspenders: disable typed rules here (in case any leak through)
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
    },
  },

  // Next special files & local config files: allow default export + relax a few rules
  {
    files: [
      'src/app/**/page.tsx',
      'src/app/**/layout.tsx',
      'src/app/**/template.tsx',
      'src/app/**/loading.tsx',
      'src/app/**/not-found.tsx',
      'src/app/**/error.tsx',
      'src/pages/**/*.{ts,tsx}',
      // local config files
      'eslint.config.mjs',
      'postcss.config.mjs',
      'next.config.ts',
      'tailwind.config.*',
      'vitest.config.ts',
      '.storybook/**',
      'src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    rules: {
      'import/no-default-export': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  // Keep Prettier last to disable conflicting rules
  prettierConfig,

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      curly: ['error', 'all'],
      'no-restricted-imports': [
        'error',
        {
          paths: [{ name: 'antd', message: 'Import AntD only via your UI folder.' }],
          patterns: [
            { group: ['antd'], message: 'Import AntD only via your UI folder.' },
            { group: ['@/components/ui/*'], message: 'Import UI components only via your UI folder.' },
            { group: ['antd/*'], message: 'Import AntD only via your UI folder.' },
            {
              group: ['@/features/*/*'],
              message: 'Import from the feature root (e.g., "@/features/foo"), not deep paths.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/components/ui/**/*.{ts,tsx}', 'src/components/infra/bridge.ts'],
    rules: { 'no-restricted-imports': 'off' },
  },
  { ignores: ['.storybook/**', 'src/**/*.stories.@(js|jsx|mjs|ts|tsx)'] },
  ...storybook.configs['flat/recommended'],
];
