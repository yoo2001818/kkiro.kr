import express from 'express';

import config from '../blog.config';
import devServer from './metagen/devServer';

import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

let webpackCompiler = webpack(webpackConfig);

let app = express();
app.use('/metadata', devServer(config.source),
  (req, res) => res.sendStatus(404));
app.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
  serverSideRender: true,
  noInfo: true
}));
app.use(webpackHotMiddleware(webpackCompiler));
app.use((req, res) => {
  const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
  const publicPath = webpackConfig.output.publicPath;
  let assets = assetsByChunkName.main;
  if (!Array.isArray(assets)) assets = [assets];
  res.send(`
<html>
  <head>
    <title>react-blog</title>
    ${
      assets
      .filter(path => path.endsWith('.css'))
      .map(path => `<link rel="stylesheet" href="${publicPath + path}" />`)
    }
  </head>
  <body>
    <div id="root"></div>
    ${
      assets
      .filter(path => path.endsWith('.js'))
      .map(path => `<script src="${publicPath + path}"></script>`)
    }
  </body>
</html>
  `);
});

app.listen(3000, () => console.log('Server started at port 3000'));
