import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginZod from "eslint-plugin-zod";;
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'zod': pluginZod,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'semi': ['error', 'always'],
      'quotes': ['error','single'],
      'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
      'no-multi-spaces': ['error', { 'ignoreEOLComments': false }],
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
);
