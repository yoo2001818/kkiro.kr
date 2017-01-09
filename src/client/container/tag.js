import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import fetchData from '../util/fetchData';
import getLanguage from '../util/getLanguage';

import { load } from '../action/data';

import NotFound from './notFound';
import Loading from './loading';
import Helmet from 'react-helmet';

import PostList from '../component/postList';

class Tag extends Component {
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
        <Helmet title={`Posts of tag '${params.id}'`} />
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

export default fetchData((store, { params }) => {
  return store.dispatch(load('site'))
  .then(() => {
    let language = getLanguage(params, store.getState());
    return store.dispatch(load('tagEntries', language, params.id));
  });
})(connect((state, props) => ({
  tagEntries: state.data && state.data.tagEntries &&
    state.data.tagEntries[getLanguage(props.params, state)]
}), { load })(Tag));
