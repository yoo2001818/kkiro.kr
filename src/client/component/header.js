import './header.scss';

import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import DropDown from './dropDown';
import { names } from '../lang';

function getLanguageLink(site, path, code) {
  let key = site.language === code ? '/' : `/lang-${code}/`;
  return path.replace(/^(\/lang-[^\/]+)?\//, key);
}

export default class Header extends Component {
  render() {
    const { title, menu, rootURL, language, site, path } = this.props;
    const languages = (site &&
      [site.language].concat(Object.keys(site.languages))) || [];
    return (
      <header>
        <div className='content'>
          <h1>
            <Link to={`${rootURL}/`}>{ title }</Link>
          </h1>
          <div className='language-selector'>
            {languages.length > 1 && (
              <DropDown title={names[language]}>
                <ul>
                  { languages.map(code => (
                    <li key={code}>
                      <Link to={getLanguageLink(site, path, code)}>
                        {names[code]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </DropDown>
            )}
          </div>
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
  menu: PropTypes.object,
  rootURL: PropTypes.string,
  site: PropTypes.object,
  language: PropTypes.string,
  path: PropTypes.string
};
