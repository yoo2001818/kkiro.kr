import './postCard.scss';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import classNames from 'classnames';

import formatDate from '../../util/formatDate';
import PostRenderer from './postRenderer';

export default class PostCard extends Component {
  render() {
    const { post, full, truncated } = this.props;
    return (
      <article className={classNames('post-card', { truncated })}>
        <div className='header'>
          <h1>
            <Link to={`/${post.id}`}>{post.title}</Link>
          </h1>
          <div className='extra'>
            <span className='date' title={
              'Updated: ' + new Date(post.updated).toLocaleString() +
              '\nPublished: ' + new Date(post.published).toLocaleString()
            }>
              {formatDate(new Date(post.published))}
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
        { !truncated && (
          <div className='content'>
            <PostRenderer post={post} full />
            { post.more && !full && (
              <div className='more'>
                <Link to={`/${post.id}#hr`}>Read more...</Link>
              </div>
            )}
          </div>
        )}
      </article>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.object,
  full: PropTypes.bool,
  truncated: PropTypes.bool
};
