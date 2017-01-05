import './index.css';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import createStore from './store';

import App from './container/app';
import PostList from './container/postList';
import Post from './container/post';

let store = createStore();

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={PostList} />
        <Route path='/post/:id' component={Post} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
