import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { load } from '../action/data';

import NotFound from './notFound';

class Post extends Component {
  componentDidMount() {
    this.props.load('postEntries', this.props.params.id);
  }
  render() {
    const { postEntries, params } = this.props;
    const post = postEntries && postEntries[params.id];
    if (post === false) {
      return (
        <NotFound />
      );
    }
    if (post == null) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <pre>
        {post.content}
      </pre>
    );
  }
}

Post.propTypes = {
  postEntries: PropTypes.object,
  load: PropTypes.func,
  params: PropTypes.object
};

export default connect(state => ({
  postEntries: state.data && state.data.postEntries
}), { load })(Post);
