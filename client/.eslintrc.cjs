module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vitest/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:unicorn/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
  ],
  plugins: [
    'react',
    'jsx-a11y',
    'unicorn',
    '@typescript-eslint',
    'import',
    'simple-import-sort',
    'unused-imports',
    'vitest'
  ],
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@emotion/*'],
      },
    ],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    'no-debugger': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'require-yield': 'warn',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'no-useless-return': 'warn',
    'no-return-await': 'off',
    'no-with': 'error',
    'require-await': 'warn',
    yoda: 'error',
    'no-new': 'error',
    'no-loop-func': 'error',
    'array-callback-return': 'error',
    'dot-notation': 'error',
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore',
      },
    ],
    'no-alert': 'warn',
    'prefer-rest-params': 'error',
    'prefer-template': 'warn',
    'prefer-spread': 'warn',
    'prefer-destructuring': 'warn',
    'prefer-const': 'warn',
    'prefer-arrow-callback': 'warn',
    'no-var': 'error',
    'no-duplicate-imports': 'warn',
    'no-useless-rename': 'warn',
    'object-shorthand': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': ['off'],
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useAsyncCallback)',
      },
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          object: false,
          Function: false,
        },
        extendDefaults: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    'prettier/prettier': 'warn',
    'unicorn/no-useless-undefined': 'warn',
    'unicorn/filename-case': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        checkFilenames: false,
        replacements: {
          args: false,
          props: false,
          err: false,
          ref: false,
        },
      },
    ],
    'import/named': 'off',
    'import/no-unresolved': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^\\u0000'], ['^node:'], ['^react'], ['^@?\\w'], ['^'], ['^\\.']],
      },
    ],
    'simple-import-sort/exports': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'newline-after-var': ['warn', 'always'],
    'padding-line-between-statements': ['warn', { blankLine: 'always', prev: '*', next: 'return' }],
  },
  globals: {
    console: false,
    process: false,
    IS_PRODUCTION: false,
    IS_DEVELOPMENT: false,
    check: true,
    gen: true,
  },
  overrides: [
    {
      files: ['*.test.ts', '*.test.tsx'],
      extends: ['plugin:vitest/recommended'],
      rules: {
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-empty-file': 'off',
      },
    },
  ],
  ignorePatterns: ['src/api/**/*'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};