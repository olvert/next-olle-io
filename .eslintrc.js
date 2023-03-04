module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: 'next/core-web-vitals',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
};
