import express from 'express';

import config from '../blog.config';
import devServer from './metagen/devServer';

import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

let webpackCompiler = webpack(webpackConfig);

let app = express();
app.use('/metadata', devServer(config.source));
app.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath
}));

app.listen(3000, () => console.log('Server started at port 3000'));
