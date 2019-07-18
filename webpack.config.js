const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              removeComments: false
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          'sass-loader?outputStyle=compressed&sourceMap',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      'meta': {'theme-color': '#4285f4'},
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].css'
    }),
  ]
}