import './post.scss';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { load } from '../action/data';

import LoadComponent from '../component/loadComponent';
import Loading from './loading';
import NotFound from './notFound';
import PostCard from '../component/postCard';

class PostView extends LoadComponent {
  load(props) {
    props.load('postEntries', props.params.id);
  }
  componentDidUpdate() {
    if (location.hash !== '') {
      setTimeout(() => {
        let node = document.querySelector(
          `a[name="${location.hash.slice(1)}"]`);
        if (node) node.scrollIntoView();
      }, 0);
      return false;
    }
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
