import React, { Component, PropTypes } from 'react';

let DISQUS_LOADED = false;

export default class Disqus extends Component {
  componentDidMount() {
    this.loadDisqus();
  }
  componentDidUpdate() {
    this.loadDisqus();
  }
  getConfig() {
    let { id, url } = this.props;
    return function() {
      this.page.url = url;
      this.page.identifier = id;
    };
  }
  loadDisqus() {
    // Ignore it if we're doing server side rendering
    if (typeof window === 'undefined') return;
    if (!DISQUS_LOADED) {
      let d = document, s = d.createElement('script');
      s.src = '//kkiro-kr.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
      DISQUS_LOADED = true;
    }
    document.disqus_config = this.getConfig();
    if (typeof DISQUS !== 'undefined') {
      DISQUS.reset({ // eslint-disable-line
        reload: true,
        config: this.getConfig()
      });
    }
  }
  render() {
    return (
      <div className='comment'>
        <div id='disqus_thread'></div>
      </div>
    );
  }
}

Disqus.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string
};
