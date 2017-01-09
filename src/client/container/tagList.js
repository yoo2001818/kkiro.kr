import './tagList.scss';

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import fetchData from '../util/fetchData';
import getLanguage from '../util/getLanguage';

import { load } from '../action/data';

import Loading from './loading';
import Helmet from 'react-helmet';

import Link from 'react-router/lib/Link';

class TagList extends Component {
  render() {
    const { tags } = this.props;
    if (tags == null) {
      return (
        <Loading />
      );
    }
    return (
      <div className='tag-list-view'>
        <Helmet title='Tag list' />
        <h1>Tags</h1>
        <ul className='tag-list'>
          { tags.map((v, i) => (
            <li key={i}>
              <Link to={`/tags/${v.name}/`} className='name'>
                {v.name}
              </Link>
              <span className='length'>{v.length}</span>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

TagList.propTypes = {
  tags: PropTypes.array,
  load: PropTypes.func
};

export default fetchData((store, { params }) => {
  return store.dispatch(load('site'))
  .then(() => {
    let language = getLanguage(params, store.getState());
    return store.dispatch(load('tags', language));
  });
})(connect((state, props) => ({
  tags: state.data && state.data.tags &&
    state.data.tags[getLanguage(props.params, state)]
}), { load })(TagList));
