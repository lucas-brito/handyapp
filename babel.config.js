module.exports = {
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-flow'],
  plugins: [
    ['@babel/plugin-proposal-optional-chaining'],
    ['@babel/plugin-proposal-decorators', {
      legacy: true,
    }],
    ['@babel/plugin-transform-runtime', {
      regenerator: false,
    }],
    ['@babel/plugin-proposal-optional-catch-binding']
  ],
};