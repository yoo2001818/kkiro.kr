import './footer.scss';

import React, { Component, PropTypes } from 'react';

export default class Footer extends Component {
  render() {
    const { copyright, site, language } = this.props;
    let langCode = (site && site.language) === language ? '' : `-${language}`;
    return (
      <footer>
        <div className='content'>
          <p className='copyright'>
            &copy; { copyright }
          </p>
          <p className='refs'>
            <a href={`/atom${langCode}.xml`}>Atom</a>
            <a href={`/rss${langCode}.xml`}>RSS</a>
            <a href='http://github.com/yoo2001818/kkiro.kr'>GitHub</a>
          </p>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  copyright: PropTypes.node,
  language: PropTypes.string,
  site: PropTypes.object
};
