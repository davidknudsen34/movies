const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const srcPath = path.resolve(__dirname, '../src');

module.exports = {
  context: path.resolve(__dirname),
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.scss', '.css'],
    alias: require('./aliases')
  },
  entry: [
    'react-hot-loader/patch',
    `${srcPath}/app/index.client.js`
  ],
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'js/[name].[hash].bundle.js',
    chunkFilename: 'js/[id].[chunkhash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpe?g|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/img'
        },
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: `${srcPath}/assets/img/favicon.ico`,
      filename: 'index.html',
      minify: false,
      inject: true,
      template: path.resolve(__dirname, `${srcPath}/views/index.html`),
    }),
  ]
};