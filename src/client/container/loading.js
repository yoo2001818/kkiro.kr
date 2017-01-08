import './loading.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Loading extends Component {
  render() {
    const { error } = this.props;
    if (error != null) {
      return (
        <div className='loading error'>
          Sorry, something went wrong. Please try again later.
        </div>
      );
    }
    return (
      <div className='loading'>
        Loading...
      </div>
    );
  }
}

Loading.propTypes = {
  error: PropTypes.object
};

export default connect(state => ({ error: state.load.error }), {})(Loading);
