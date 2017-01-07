import './post.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { load } from '../action/data';

import Loading from './loading';
import NotFound from './notFound';
import PostCard from '../component/postCard';

class PostView extends Component {
  componentWillMount() {
    this.props.load('postEntries', this.props.params.id);
  }
  componentWillReceiveProps(nextProps) {
    nextProps.load('postEntries', nextProps.params.id);
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
        <Loading />
      );
    }
    return (
      <div className='post-view'>
        <PostCard post={post} full />
        { post.layout !== 'page' && (
          <Link to='/' className='back'>Back to list</Link>
        )}
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
