import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { load } from '../action/data';

import NotFound from './notFound';
import { Link } from 'react-router';

class Tag extends Component {
  componentDidMount() {
    this.props.load('tagEntries', this.props.params.id);
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
        <div>Loading...</div>
      );
    }
    return (
      <ul>
        { tag.map((v, i) => (
          <li key={i}>
            <Link to={`/${v.id}`}>{v.title}</Link>
          </li>
        )) }
      </ul>
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
