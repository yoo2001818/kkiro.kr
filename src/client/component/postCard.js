import './postCard.scss';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class PostCard extends Component {
  render() {
    const { post } = this.props;
    return (
      <article className='post-card'>
        <div className='header'>
          <h1>
            <Link to={`/${post.id}`}>{post.title}</Link>
          </h1>
          <div className='extra'>
            <span className='date'>
              {post.date}
            </span>
            <ul className='tags'>
              { post.tags.map((v, i) => (
                <li key={i}>{v}</li>
              )) }
            </ul>
          </div>
        </div>
        <div className='content'>
          {post.brief}
        </div>
        { post.more && (
          <div className='more'>
            <Link to={`/${post.id}`}>Read more...</Link>
          </div>
        )}
      </article>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.object
};
