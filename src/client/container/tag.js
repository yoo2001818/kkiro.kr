import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { load } from '../action/data';

import NotFound from './notFound';
import Loading from './loading';

import LoadComponent from '../component/loadComponent';
import PostList from '../component/postList';

class Tag extends LoadComponent {
  load(props) {
    props.load('tagEntries', props.params.id);
  }
  render() {
    const { tagEntries, params } = this.props;
    const tag = tagEntries && tagEntries[params.id];
    if (tag === false) {
      return (
        <NotFound />
      );
    }
    if (tag == null) {
      return (
        <Loading />
      );
    }
    return (
      <div className='tag-view'>
        <h1>Posts of tag '{params.id}'</h1>
        <PostList posts={tag} />
      </div>
    );
  }
}

Tag.propTypes = {
  tagEntries: PropTypes.object,
  load: PropTypes.func,
  params: PropTypes.object
};

export default connect(state => ({
  tagEntries: state.data && state.data.tagEntries
}), { load })(Tag);
