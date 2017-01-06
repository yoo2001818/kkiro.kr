import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { load } from '../action/data';

import { Link } from 'react-router';

class TagList extends Component {
  componentDidMount() {
    this.props.load('tags');
  }
  render() {
    const { tags } = this.props;
    if (tags == null) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <ul>
        { tags.map((v, i) => (
          <li key={i}>
            <Link to={`/tags/${v}`}>{v}</Link>
          </li>
        )) }
      </ul>
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
