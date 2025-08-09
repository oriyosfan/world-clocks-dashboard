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
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'cypress/**',
      'src/**/*.test.*',
      'src/**/*.spec.*',
    ],
  },

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
      // Enforce using shorthand syntax in object literals where possible
      'object-shorthand': ['error', 'always', { avoidQuotes: true }],

      // Import hygiene
      // Prefer named exports; they make refactors safer and enable better tree‑shaking
      'import/no-default-export': 'error',
      // Keep imports ordered consistently to reduce diff noise and improve readability
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // TS strictness (type-aware)
      // Use `import type` for type-only imports to avoid pulling runtime code
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      // Disallow `any` to maintain type safety and prevent unsafe flows
      '@typescript-eslint/no-explicit-any': 'error',
      // Error on unused variables; allow intentionally unused via leading underscore
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      // Ensure Promises are handled (awaited or chained), preventing unhandled rejections
      '@typescript-eslint/no-floating-promises': 'error',
      // Forbid redundant type assertions that the compiler can already infer
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      // Restrict TS directive comments; allow `ts-expect-error` only with a description
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
      // Disallow assigning an unknown/any value to a typed variable
      '@typescript-eslint/no-unsafe-assignment': 'error',
      // Disallow passing unknown/any values to typed parameters
      '@typescript-eslint/no-unsafe-argument': 'error',
      // Disallow calling a value with an unknown/any type
      '@typescript-eslint/no-unsafe-call': 'error',
      // Disallow reading properties from unknown/any values
      '@typescript-eslint/no-unsafe-member-access': 'error',
      // Disallow returning unknown/any values from functions
      '@typescript-eslint/no-unsafe-return': 'error',
      // Promise correctness
      // Only `await` real thenables; flags accidental awaits on non-promises
      '@typescript-eslint/await-thenable': 'error',
      // Catch misused promises in void contexts and conditionals; relax for JSX event handlers
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksConditionals: true,
          checksVoidReturn: { attributes: false }, // keeps React handlers ergonomic
        },
      ],

      // Prettier as errors
      // Treat formatting issues as errors to keep code style consistent
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
      // Enforce using shorthand syntax in object literals where possible
      'object-shorthand': ['error', 'always', { avoidQuotes: true }],
      // Prefer named exports; default exports are allowed only in special files
      'import/no-default-export': 'error',
      // Keep imports ordered consistently to reduce diff noise and improve readability
      'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc', caseInsensitive: true } }],
      // Treat formatting issues as errors to keep code style consistent
      'prettier/prettier': 'error',

      // Belt & suspenders: disable typed rules here (in case any leak through)
      // Typed rule; disable for plain JS files
      '@typescript-eslint/await-thenable': 'off',
      // Typed rule; disable for plain JS files
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
      'cypress.config.js',
    ],
    rules: {
      // Allow default exports in framework entrypoints and config files
      'import/no-default-export': 'off',
      // Allow `any` in story/config files to keep DX simple
      '@typescript-eslint/no-explicit-any': 'off',
      // Allow implicit return types in story/config files
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  // Keep Prettier last to disable conflicting rules
  prettierConfig,

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      // Require curly braces for all control statements for clarity and safer diffs
      curly: ['error', 'all'],
      // Restrict certain import paths to enforce architecture boundaries and DX rules
      'no-restricted-imports': [
        'error',
        {
          // Fully ban importing the runtime package directly; enforce using the UI abstractions
          // e.g. importing `antd` directly is forbidden in app code
          paths: [{ name: 'antd', message: 'Import AntD only via your UI folder.' }],
          // Disallow glob patterns that break our layering conventions
          patterns: [
            // Do not import the entire `antd` namespace; use your local UI wrappers
            { group: ['antd'], message: 'Import AntD only via your UI folder.' },
            // Do not deep import UI components from their internal paths
            { group: ['@/components/ui/*'], message: 'Import UI components only via your UI folder.' },
            // Forbid all subpath imports from `antd`; use the wrapper
            { group: ['antd/*'], message: 'Import AntD only via your UI folder.' },
            // Enforce importing from feature roots to keep boundaries stable
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
