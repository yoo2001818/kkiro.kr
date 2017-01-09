import React from 'react';
import { render } from 'react-dom';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import { Provider } from 'react-redux';
import { useScroll } from 'react-router-scroll';

import prefetch from './util/prefetch';
import metadataClient from './util/metadataClient';
import metadataMiddleware from './middleware/metadata';
import createStore from './store';
import routes from './routes';

let store = createStore(window.__INITIAL_STATE__, [
  metadataMiddleware(metadataClient)
]);

let scrollMiddleware = useScroll((prevRouterProps, {routes, location}) => {
  if (routes.find(a => a.ignoreScrollBehavior)) return false;
  if (routes.find(a => a.scrollToTop)) return [0, 0];
  if (location.hash !== '') {
    setTimeout(() => {
      let node = document.querySelector(`a[name="${location.hash.slice(1)}"]`);
      if (node) node.scrollIntoView();
    }, 0);
    return false;
  }
  return true;
});

function handleUpdate() {
  prefetch(store, this.state);
  if (typeof document.ga !== 'undefined') {
    document.ga('set', 'page', this.state.location.pathname);
    document.ga('send', 'pageview');
  }
}

render((
  <Provider store={store}>
    <Router
      history={browserHistory}
      render={applyRouterMiddleware(scrollMiddleware)}
      routes={routes}
      onUpdate={handleUpdate}
    />
  </Provider>
), document.getElementById('root'));
