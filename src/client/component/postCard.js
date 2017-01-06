import './postCard.scss';

import React, { Component, PropTypes } from 'react';

export default class PostCard extends Component {
  render() {
    const { post } = this.props;
    return (
      <article className='post-card'>
        <div className='header'>
          <h1>{post.title}</h1>
          <span className='date'>
            {post.date}
          </span>
          <ul className='tags'>
            { post.tags.map((v, i) => (
              <li key={i}>{v}</li>
            )) }
          </ul>
        </div>
        <div className='content'>
          {post.brief}
        </div>
      </article>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.object
};
