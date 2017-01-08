import './footer.scss';

import React, { Component, PropTypes } from 'react';

export default class Footer extends Component {
  render() {
    const { copyright } = this.props;
    return (
      <footer>
        <div className='content'>
          <p className='copyright' dangerouslySetInnerHTML={{
            __html: copyright
          }} />
          <p className='refs'>
            <a href='/atom.xml'>Atom</a>
            <a href='/rss.xml'>RSS</a>
            <a href='http://github.com/yoo2001818/kkiro.kr'>GitHub</a>
          </p>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  copyright: PropTypes.node
};
