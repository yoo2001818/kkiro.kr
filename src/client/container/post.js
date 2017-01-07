import './post.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { load } from '../action/data';

import NotFound from './notFound';
import PostCard from '../component/postCard';

class PostView extends Component {
  componentWillMount() {
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
      <div className='post-view'>
        <PostCard post={post} full />
      </div>
    );
  }
}

PostView.propTypes = {
  postEntries: PropTypes.object,
  load: PropTypes.func,
  params: PropTypes.object
};

export default connect(state => ({
  postEntries: state.data && state.data.postEntries
}), { load })(PostView);
