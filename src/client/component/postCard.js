import './postCard.scss';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import formatDate from '../../util/formatDate';
import PostRenderer from './postRenderer';

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
              {formatDate(new Date(post.date))}
            </span>
            <ul className='tags'>
              { post.tags.map((v, i) => (
                <li key={i}>
                  <Link to={`/tags/${v}`}>{v}</Link>
                </li>
              )) }
            </ul>
          </div>
        </div>
        <div className='content'>
          <PostRenderer post={post} />
          { post.more && (
            <div className='more'>
              <Link to={`/${post.id}`}>Read more...</Link>
            </div>
          )}
        </div>
      </article>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.object
};
