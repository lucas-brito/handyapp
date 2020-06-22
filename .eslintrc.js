module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
      experimentalDecorators: true
    }
  },
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prefer-stateless-function': 'off',
    'max-len': 'warn',
    'no-nested-ternary': 'off'
  },
  globals: {
    fetch: false,
  },
};
