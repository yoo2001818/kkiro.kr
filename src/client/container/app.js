import './app.scss';

import React, { Component, PropTypes } from 'react';

import Header from '../component/header';
import Footer from '../component/footer';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Header />
        <main>
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};
