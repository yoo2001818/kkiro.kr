import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { load } from '../action/data';

class App extends Component {
  componentDidMount() {
    this.props.load('posts');
  }
  render() {
    return (
      <div>
        <p>App!</p>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default connect(state => state, { load })(App);
