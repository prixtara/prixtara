// @ts-check
import tseslint from 'typescript-eslint';
import globals from 'globals';
import baseConfig from './base.js';

/** @type {import('typescript-eslint').ConfigArray} */
const config = tseslint.config(...baseConfig, {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2022,
    },
  },
  rules: {
    // React-specific rules will be added when @eslint/react is configured
    // TODO: Add react-hooks rules when eslint-plugin-react-hooks supports flat config
  },
});

export default config;
