module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    // 'eslint:recommended'
    '@vue/standart'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-tabs': 'off',
    'quotes': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
