import './header.scss';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    const { title, menu } = this.props;
    return (
      <header>
        <div className='content'>
          <h1>
            <Link to='/'>{ title }</Link>
          </h1>
          <nav>
            <ul>
              { menu && Object.keys(menu).map((v, i) => (
                <li key={i}>
                  <Link to={menu[v]}>{v}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.node,
  menu: PropTypes.object
};
