const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-proposal-class-properties'],
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      meta: {
        viewport: 'width=device-width, initial-scale=1.0, ' +
          'maximum-scale=1.0, user-scalable=no'
      },
      title: 'Snake Game'
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  }
}
