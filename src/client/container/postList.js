import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import fetchData from '../util/fetchData';
import getLanguage from '../util/getLanguage';

import { load } from '../action/data';

import Loading from './loading';

import PostList from '../component/postList';

class PostListView extends Component {
  render() {
    const { posts } = this.props;
    if (posts == null) {
      return (
        <Loading />
      );
    }
    return (
      <div className='post-list-view'>
        <PostList posts={posts} />
      </div>
    );
  }
}

PostListView.propTypes = {
  posts: PropTypes.array,
  load: PropTypes.func
};

export default fetchData((store, { params }) => {
  return store.dispatch(load('site'))
  .then(() => {
    let language = getLanguage(params, store.getState());
    return store.dispatch(load('posts', language));
  });
})(connect((state, props) => ({
  posts: state.data && state.data.posts &&
    state.data.posts[getLanguage(props.params, state)]
}), { load })(PostListView));
