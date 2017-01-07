import './header.scss';

import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
  render() {
    const { title } = this.props;
    return (
      <header>
        <div className='content'>
          <h1>{ title }</h1>
          <nav>
            <ul>
              <li>About</li>
              <li>Blog</li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.node
};
