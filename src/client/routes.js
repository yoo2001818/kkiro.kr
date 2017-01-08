import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './container/app';
import PostList from './container/postList';
import Post from './container/post';
import TagList from './container/tagList';
import Tag from './container/tag';
import NotFound from './container/notFound';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={PostList} />
    <Route path='tags' component={TagList} />
    <Route path='tags/:id' component={Tag} />
    <Route path=':id' component={Post} />
    <Route path='*' component={NotFound} />
  </Route>
);
