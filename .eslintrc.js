module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.eslint.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  ignorePatterns: ['.eslintrc.js', 'commitlint.config.js'],
  rules: {
    'prettier/prettier': 'error',
    'linebreak-style': 0,
    'no-underscore-dangle': 0,
    'no-restricted-syntax': 0,
    // typescript-eslint rules
    '@typescript-eslint/no-unused-expressions': 1,
    '@typescript-eslint/explicit-member-accessibility': 1,
    '@typescript-eslint/comma-dangle': 0,
    '@typescript-eslint/semi': 0,
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'typeAlias', prefix: ['T'], format: ['PascalCase'] },
      { selector: 'class', format: ['PascalCase'] },
      { selector: 'variable', modifiers: ['const'], format: ['UPPER_CASE', 'camelCase'] },
    ],
    // prettier rules
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
}
