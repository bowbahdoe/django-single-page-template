const { resolve } = require('path')
const BundleTracker = require('webpack-bundle-tracker')
const {
  TsConfigPathsPlugin
} = require('awesome-typescript-loader')
const { CheckerPlugin } = require('awesome-typescript-loader')
const SRC = resolve(__dirname, 'src/')
const DIST = resolve(__dirname, 'assets/bundles')

module.exports = {
  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new TsConfigPathsPlugin({
      configFileName: 'tsconfig.json'
    }),
    new CheckerPlugin(),
  ],
  devtool: 'source-map',
  entry: {
    bundle: ["babel-polyfill", resolve(SRC, 'index.js')],
  },
  output: {
    path: DIST,
    filename: '[name]-[hash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.wisp$/,
        loader: 'wisp-loader'
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
