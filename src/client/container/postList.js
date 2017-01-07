import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { load } from '../action/data';

import Loading from './loading';

import PostList from '../component/postList';

class PostListView extends Component {
  componentWillMount() {
    this.props.load('posts');
  }
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

export default connect(state => ({
  posts: state.data && state.data.posts
}), { load })(PostListView);
