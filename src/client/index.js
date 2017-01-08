import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory,
  applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { useScroll } from 'react-router-scroll';

import metadataClient from './util/metadataClient';
import metadataMiddleware from './middleware/metadata';
import createStore from './store';
import routes from './routes';

let store = createStore(undefined, [
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

render((
  <Provider store={store}>
    <Router
      history={browserHistory}
      render={applyRouterMiddleware(scrollMiddleware)}
      routes={routes}
    />
  </Provider>
), document.getElementById('root'));
