import './tagList.scss';

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import fetchData from '../util/fetchData';
import fetchLanguage from '../util/fetchLanguage';

import { load } from '../action/data';

import Loading from './loading';
import Helmet from 'react-helmet';

import Link from 'react-router/lib/Link';

class TagList extends Component {
  render() {
    const { tags, rootURL } = this.props;
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
              <Link to={`${rootURL}/tags/${v.name}/`} className='name'>
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
  load: PropTypes.func,
  rootURL: PropTypes.string
};

export default fetchData(fetchLanguage((store, { params }, language) => {
  return store.dispatch(load('tags', language));
}))(connect((state, props) => ({
  tags: state.data && state.data.tags &&
    state.data.tags[props.language]
}), { load })(TagList));
