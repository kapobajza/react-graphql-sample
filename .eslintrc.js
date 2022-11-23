module.exports = {
  root: true,
  extends: ['react-app', 'plugin:react-hooks/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['off'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-undef-init': 'off',
        'import/order': [
          'error',
          {
            'newlines-between': 'always',
          },
        ],
      },
    },
  ],
  globals: {
    JSX: true,
    NodeJS: true,
  },
};
