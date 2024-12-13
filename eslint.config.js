import antfu from '@antfu/eslint-config';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat(antfu);

export default antfu(
  {
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
      overrides: {
        'style/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'semi',
              requireLast: true,
            },
            singleline: {
              delimiter: 'semi',
              requireLast: true,
            },
            multilineDetection: 'brackets',
          },
        ],
      },
    },
    vue: true,
    typescript: true,
  },
  ...compat.config({
    extends: ['plugin:tailwindcss/recommended'],
    settings: {
      tailwindcss: {
        config: 'tailwind.config.ts',
      },
    },
    root: true,
    rules: {
      'vue/block-order': 'off',
      'no-empty': 'off',
      'no-console': 'warn',
      'ts/no-explicit-any': 'warn',
      'vue/component-tags-order': ['error', { order: ['template', 'script', 'style'] }],
      'vue/multi-word-component-names': 'off',
      'vue/no-empty-component-block': 'error',
      'vue/require-default-prop': 'off',
      'vue/padding-line-between-blocks': ['error', 'always'],
      'tailwindcss/no-custom-classname': [
        'warn',
        {
          config: 'tailwind.config.ts',
          cssFiles: ['assets/styles/index.css'],
        },
      ],
    },
  }),
  {
    files: ['**/*.vue'],
    rules: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  },
);
