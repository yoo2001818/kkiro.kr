import './app.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { load } from '../action/data';

import Header from '../component/header';
import Footer from '../component/footer';

class App extends Component {
  componentWillMount() {
    this.props.load('site');
  }
  render() {
    const { site } = this.props;
    return (
      <div className='app'>
        <Header title={site && site.title} />
        <main>
          {this.props.children}
        </main>
        <Footer copyright={site && site.rights}/>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  load: PropTypes.func,
  site: PropTypes.object
};

export default connect(state => ({
  site: state.data && state.data.site
}), { load })(App);
