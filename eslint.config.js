import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'semi': ['error', 'always'],
      'quotes': ['error','single'],
      'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
      'no-multi-spaces': ['error', { 'ignoreEOLComments': false }],
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
