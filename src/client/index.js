import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory,
  applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { useScroll } from 'react-router-scroll';

import createStore from './store';
import routes from './routes';

let store = createStore();

render((
  <Provider store={store}>
    <Router
      history={browserHistory}
      render={applyRouterMiddleware(useScroll())}
      routes={routes}
    />
  </Provider>
), document.getElementById('root'));
