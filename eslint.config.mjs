// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  // Globally ignored paths
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/.sanity/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/playwright-report/**',
    ],
  },

  // Base JS rules
  js.configs.recommended,

  // TypeScript rules for all TS/TSX files
  ...tseslint.configs.recommended,

  // Global settings for all source files
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
    rules: {
      // Enforce no implicit any — architectural rule
      '@typescript-eslint/no-explicit-any': 'error',

      // Warn on unused vars, but allow underscore-prefixed parameters
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Prefer explicit return types on exported functions for documentation
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Allow empty interfaces as they're useful as named types
      '@typescript-eslint/no-empty-object-type': 'warn',

      // Consistent type imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
    },
  },

  // Relax some rules for config files
  {
    files: ['**/*.config.{ts,mjs,cjs,js}', '**/eslint.config.{mjs,cjs,js}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
);
