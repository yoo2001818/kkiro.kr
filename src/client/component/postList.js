import './postList.scss';

import React, { Component, PropTypes } from 'react';

import PostCard from './postCard';

export default class PostList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <ul className='post-list'>
        { posts.map((v, i) => (
          <li key={i}>
            <PostCard post={v} />
          </li>
        )) }
      </ul>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array
};
