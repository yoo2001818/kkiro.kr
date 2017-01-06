var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  context: __dirname,
  entry: ['client']
    .concat(!PRODUCTION ? 'webpack-hot-middleware/client?overlay=true' : []),
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
    new webpack.NoErrorsPlugin()
  ]
    .concat(PRODUCTION ? [
      new ExtractTextPlugin('bundle.css')
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
