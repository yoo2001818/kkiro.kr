import './tagList.scss';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { load } from '../action/data';

import Loading from './loading';
import Helmet from 'react-helmet';

import LoadComponent from '../component/loadComponent';
import Link from 'react-router/lib/Link';

class TagList extends LoadComponent {
  load(props) {
    props.load('tags');
  }
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
              <Link to={`/tags/${v.name}`} className='name'>
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

export default connect(state => ({
  tags: state.data && state.data.tags
}), { load })(TagList);
