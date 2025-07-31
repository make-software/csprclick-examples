import { globalIgnores } from 'eslint/config';
import nxPlugin from '@nrwl/eslint-plugin-nx';
import tsESLintPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
  globalIgnores(['dist']),

  {
    plugins: {
      nx: nxPlugin,
      '@typescript-eslint': tsESLintPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin
    }
  },
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    rules: {
      'nx/enforce-module-boundaries': 'off'
    }
  },

  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    rules: {
      'no-useless-rename': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'react/jsx-no-useless-fragment': 'off',
      'react-hooks/exhaustive-deps': 'off'
    }
  },

  {
    files: ['*.js', '*.jsx'],
    rules: {
      quotes: ['warn', 'double']
    }
  }
];
