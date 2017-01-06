import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import createStore from './store';

import App from './container/app';
import PostList from './container/postList';
import Post from './container/post';
import TagList from './container/tagList';
import Tag from './container/tag';
import NotFound from './container/notFound';

let store = createStore();

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={PostList} />
        <Route path='tags' component={TagList} />
        <Route path='tags/:id' component={Tag} />
        <Route path=':id' component={Post} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
