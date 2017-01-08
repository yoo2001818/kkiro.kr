var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  context: __dirname,
  entry: ['client']
    .concat(!PRODUCTION ? 'webpack-hot-middleware/client?overlay=true' : []),
  output: {
    path: path.resolve(__dirname, 'public', 'assets'),
    publicPath: '/assets/',
    filename: 'bundle.js',
    chunkFilename: '[id].js',
    pathinfo: true
  },
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules'],
    alias: PRODUCTION ? {
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    } : {}
  },
  // devtool: 'source-map',
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/unicode\/category\/So/),
    new WebpackIsomorphicToolsPlugin(
      require('./webpack-isomorphic-tools.config'))
  ]
    .concat(PRODUCTION ? [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new ExtractTextPlugin('bundle.css'),
      new LodashModuleReplacementPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin()
    ] : [
      new webpack.HotModuleReplacementPlugin()
    ]),
  module: {
    loaders: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json$/i,
        loader: 'json'
      },
      {
        test: /\.html?$/i,
        loader: 'html'
      },
      {
        test: /\.css$/i,
        loader: PRODUCTION ? ExtractTextPlugin.extract('style', 'css') :
          'style!css'
      },
      {
        test: /\.s[ca]ss$/i,
        loader: PRODUCTION ? ExtractTextPlugin.extract('style', 'css!sass') :
          'style!css!sass'
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loader: 'url?limit=10240'
      },
      {
        test: /\.(png|jpe?g|gif|tiff)?$/,
        loader: 'file'
      }
    ]
  }
};
