const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    open: true
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: 'src/index.html',
      }),
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false
      }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
      }
    ],
  },
};