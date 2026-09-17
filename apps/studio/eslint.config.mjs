// @ts-check
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '@prixtara/eslint-config/react-internal';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

void _dirname; // used for potential future parserOptions.tsconfigRootDir

export default baseConfig;
