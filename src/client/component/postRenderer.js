import './postRenderer.scss';

import React, { Component, PropTypes } from 'react';
import marked from 'marked';
import highlight from 'highlight.js';

let renderer = new marked.Renderer();

renderer.hr = function() {
  if (!this.hrCount) {
    this.hrCount = true;
    return '<a name="hr"><hr /></a>';
  }
  return '<hr />';
};

const options = {
  highlight: (code, lang) => highlight.highlight(lang, code).value,
  renderer
};

export default class PostRenderer extends Component {
  render() {
    const { post, full } = this.props;
    // I feel sorry for this
    // TODO Change this to react-markdown as time passes
    renderer.hrCount = 0;
    renderer.full = full;
    let content = marked(post.content || post.brief, options);
    return (
      <div className='post-renderer' dangerouslySetInnerHTML={{
        __html: content
      }} />
    );
  }
}

PostRenderer.propTypes = {
  post: PropTypes.object,
  full: PropTypes.bool
};
