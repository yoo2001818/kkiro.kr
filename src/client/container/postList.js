import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { load } from '../action/data';

import PostList from '../component/postList';

class PostListView extends Component {
  componentDidMount() {
    this.props.load('posts');
  }
  render() {
    const { posts } = this.props;
    if (posts == null) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <PostList posts={posts} />
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
