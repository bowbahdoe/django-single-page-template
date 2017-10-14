const { resolve } = require('path')
const BundleTracker = require('webpack-bundle-tracker')
const SRC = resolve(__dirname, 'src/')
const DIST = resolve(__dirname, 'assets/bundles')

module.exports = {
  plugins: [
    new BundleTracker({filename: './webpack-stats.json'})
  ],
  entry: {
    bundle: ["babel-polyfill", resolve(SRC, 'index.js')],
  },
  output: {
    path: DIST,
    filename: '[name]-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.(s?[ac]ss)$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  }
}
