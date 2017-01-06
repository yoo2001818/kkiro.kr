var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  // No HMR for now
  // 'webpack-hot-middleware/client?overlay=true'
  entry: ['client'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/assets/',
    filename: 'bundle.js',
    chunkFilename: '[id].js',
    pathinfo: true
  },
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules']
  },
  // devtool: 'source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('bundle.css', {
      disable: process.env.NODE_ENV !== 'production'
    })
  ],
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
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.s[ca]ss$/i,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      {
        test: /(\.vert|\.frag|\.obj|\.mtl|\.dae)$/i,
        loader: 'raw'
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loader: 'url?limit=10240'
      },
      {
        test: /\.(png|jpe?g|gif|tiff|mp4|mkv|webm)?$/,
        loader: 'file'
      }
    ]
  }
};
