import './postCard.scss';

import React, { Component, PropTypes } from 'react';
import marked from 'marked';

export default class PostRenderer extends Component {
  render() {
    const { post } = this.props;
    let content = marked(post.content || post.brief);
    return (
      <div className='post-renderer' dangerouslySetInnerHTML={{
        __html: content
      }} />
    );
  }
}

PostRenderer.propTypes = {
  post: PropTypes.object
};
