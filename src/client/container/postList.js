import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { load } from '../action/data';

class PostList extends Component {
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
      <ul>
        { posts.map((v, i) => (
          <li key={i}>{v.title}</li>
        )) }
      </ul>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array,
  load: PropTypes.func
};

export default connect(state => ({
  posts: state.data && state.data.posts
}), { load })(PostList);
