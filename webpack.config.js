/**
 * @file Webpack configuration file.
 */
// ━━	IMPORT PACKAGES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » NATIVE PACKAGES
const path = require('path');

// » THIRD PARTIES PACKAGES

// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// const environment = process.env.NODE_ENV;

// const map_mode = new Map([
//   ['development', 'development'],
//   ['production', 'production'],
//   ['none', 'none'],
// ]);

// ━━	EXPORT MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = {
  mode: 'production',
  // entry: './index.js',
  entry: `${__dirname}/src/index`,
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'Month',
      type: 'var',
    },
    filename: 'month.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
    ],
  },
  plugins: [],
};
