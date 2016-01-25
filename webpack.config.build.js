'use strict';

var autoprefixer = require('autoprefixer');
var HtmlWepbackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;

module.exports = {
  context: __dirname,
  entry: { main: './src' },
  output: {
    path: 'dist',
    filename: '[hash].js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // Autoload style files named like an included jsx file.
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'baggage-loader?[file].styl',
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!postcss-loader!stylus-loader',
      },
      {
        test: /\.(png|webm|svg)$/,
        loader: 'file-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  resolve: {
    // modulesDirectories: ['node_modules'],
    extensions: ['', '.min.js', '.js', '.jsx'],
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new HtmlWepbackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: 'body',
      version: require('./package.json').version,
      chunks: ['main'],
    }),
    new UglifyJsPlugin(),
  ],
};
