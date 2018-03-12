const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['', '.js','css']
  },
  entry: ['babel-polyfill','./src/index.js'],
  output: {
    filename: 'app.js',
    path: './assets/js/',
    publicPath: '/'
  },

  module: {
    loaders: [
      { test: /(\.js)$/, exclude: /node_modules/, loaders: ['babel'] },
      // {
      //   test   : /\.css$/,
      //   loaders: ['style-loader', 'css-loader', 'resolve-url-loader']
      // }, {
      //   test   : /\.scss$/,
      //   loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
      // }
    ],
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },

  devServer: {
    host: '0.0.0.0',
    port: 8333,
    inline: true
  },

  plugins: [
    // new HtmlWebpackPlugin({ template: './src/assets/index.html' }),
    // new HtmlWebpackPlugin({ template: './index.php' }),
    // new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ]
}
