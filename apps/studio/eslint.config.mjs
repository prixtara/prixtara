// @ts-check
import baseConfig from '@prixtara/eslint-config/react-internal';

/** @type {import('typescript-eslint').ConfigArray} */
export default [
  {
    ignores: ['dist/**', '.sanity/**'],
  },
  ...baseConfig,
];
