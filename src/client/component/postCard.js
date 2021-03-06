import './postCard.scss';

import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';

import classNames from 'classnames';

import formatDate, { formatDateTime } from '../../util/formatDate';
import PostRenderer from './postRenderer';

export default class PostCard extends Component {
  render() {
    const { post, full, truncated, rootURL } = this.props;
    return (
      <article className={classNames('post-card', { truncated })}>
        <div className='header'>
          <h1>
            <Link to={`${rootURL}/${post.id}/`}>{post.title}</Link>
          </h1>
          <div className='extra'>
            <span className='date' title={
              'Updated: ' + formatDateTime(new Date(post.updated)) +
              '\nPublished: ' + formatDateTime(new Date(post.published))
            }>
              {formatDate(new Date(post.published))}
            </span>
            <ul className='tags'>
              { post.tags.map((v, i) => (
                <li key={i}>
                  <Link to={`${rootURL}/tags/${v}/`}>{v}</Link>
                </li>
              )) }
            </ul>
          </div>
        </div>
        { !truncated && (
          <div className='content'>
            <PostRenderer post={post} full={full} />
            { post.more && !full && (
              <div className='more'>
                <Link to={`${rootURL}/${post.id}/#hr`}>Read more...</Link>
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
  truncated: PropTypes.bool,
  rootURL: PropTypes.string
};
