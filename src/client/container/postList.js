import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import fetchData from '../util/fetchData';
import fetchLanguage from '../util/fetchLanguage';

import { load } from '../action/data';

import Loading from './loading';

import PostList from '../component/postList';

class PostListView extends Component {
  render() {
    const { posts, rootURL } = this.props;
    if (posts == null) {
      return (
        <Loading />
      );
    }
    return (
      <div className='post-list-view'>
        <PostList posts={posts} rootURL={rootURL} />
      </div>
    );
  }
}

PostListView.propTypes = {
  posts: PropTypes.array,
  rootURL: PropTypes.string,
  load: PropTypes.func
};

export default fetchData(fetchLanguage((store, { params }, language) => {
  return store.dispatch(load('posts', language));
}))(connect((state, props) => ({
  posts: state.data && state.data.posts &&
    state.data.posts[props.language]
}), { load })(PostListView));
