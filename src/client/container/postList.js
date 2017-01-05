import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { load } from '../action/data';

import { Link } from 'react-router';

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
          <li key={i}>
            <Link to={`/post/${v.id}`}>{v.title}</Link>
          </li>
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
