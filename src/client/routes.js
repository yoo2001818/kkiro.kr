import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import App from './container/app';
import PostList from './container/postList';
import Post from './container/post';
import TagList from './container/tagList';
import Tag from './container/tag';
import NotFound from './container/notFound';

export default (
  <Route path='/(lang-:language/)' component={App}>
    <IndexRoute component={PostList} />
    <Route path='tags/' component={TagList} />
    <Route path='tags/:id/' component={Tag} />
    <Route path=':id/' component={Post} />
    <Route path='*' component={NotFound} />
  </Route>
);
