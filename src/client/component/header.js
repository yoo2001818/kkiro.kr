import './header.scss';

import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className='content'>
          <h1>kkiro.kr</h1>
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
