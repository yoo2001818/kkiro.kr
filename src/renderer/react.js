import React from 'react';
import Helmet from 'react-helmet';

import { renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import serialize from 'serialize-javascript';

import routes from '../client/routes';
import createStore from '../client/store';
import metadataMiddleware from '../client/middleware/metadata';
import metadataServer from '../client/util/metadataServer';

export default function renderReact(link, files, publicPath,
  assetsByChunkName, footer
) {
  return new Promise((resolve, reject) => {
    let store = createStore(undefined, [
      metadataMiddleware(metadataServer(files))
    ]);
    match({ routes, location: link }, (error, redirect, renderProps) => {
      if (error) {
        reject(error);
      } else if (redirect) {
        // TODO Uh... what?
        reject(new Error('Redirection is not supported yet'));
      } else if (renderProps) {
        let tree = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        // FIXME: We have to render twice to make it operate properly
        renderToStaticMarkup(tree);
        Helmet.rewind();
        let result = renderToStaticMarkup(tree);
        let head = Helmet.rewind();
        // OK, then wrap the data into HTML
        let assets = assetsByChunkName.main;
        if (!Array.isArray(assets)) assets = [assets];
        let html = `<!doctype html>
<html>
  <head>
    ${head.title.toString()}
    ${head.meta.toString()}
    ${head.link.toString()}
    ${
      assets
      .filter(path => path.endsWith('.css'))
      .map(path => `<link rel="stylesheet" href="${publicPath + path}" />`)
      .join('')
    }
  </head>
  <body>
    <div id="root">
      ${result}
    </div>
    <script>
      window.__INITIAL_STATE__ = ${serialize(store.getState())}
    </script>
    ${
      assets
      .filter(path => path.endsWith('.js'))
      .map(path => `<script src="${publicPath + path}"></script>`)
      .join('')
    }
    ${footer}
  </body>
</html>
    `;
        resolve(html);
      }
    });
  });
}
