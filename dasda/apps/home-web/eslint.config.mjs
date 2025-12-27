import nextEslintPluginNext from '@next/eslint-plugin-next';
import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';
import importPlugin from 'eslint-plugin-import';

export default [
  { plugins: { '@next/next': nextEslintPluginNext, import: importPlugin } },
  ...baseConfig,
  ...nx.configs['flat/react-typescript'],
  {
    ignores: ['.next/**/*', '**/out-tsc'],
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
      'react/no-unescaped-entities': 'off',
    },
  },
  {
    files: ['src/app/**/*.tsx'],
    ignores: ['**/layout.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'JSXOpeningElement[attributes] > JSXAttribute[name.name="className"]',
          message: 'className is not allowed in app components. Move styling to reusable components in the components/ directory.',
        },
      ],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'lucide-react',
              message: 'lucide-react icons cannot be imported directly. Use the Icon component from @/components/ui or pass icons through Button/Checkbox components.',
            },
          ],
          patterns: [
            {
              group: ['lucide-react'],
              message: 'lucide-react icons cannot be imported directly. Use the Icon component from @/components/ui or pass icons through Button/Checkbox components.',
            },
          ],
        },
      ],
    },
  },
];
