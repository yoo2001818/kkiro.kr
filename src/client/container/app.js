import './app.scss';

import React, { PropTypes, Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import fetchData from '../util/fetchData';

import { load } from '../action/data';

import Helmet from 'react-helmet';

import Header from '../component/header';
import Footer from '../component/footer';

function mergeSite(site, language) {
  if (site.language === language) return site;
  return Object.assign({}, site, site.languages[language],
    { language: language });
}

class App extends Component {
  render() {
    if (this.props.site == null) {
      // Just display bare shape of the website
      return (
        <div className='app'>
          <Header />
          <main />
          <Footer />
        </div>
      );
    }
    const language = this.props.params.language || this.props.site.language ||
      'en';
    const site = mergeSite(this.props.site, language);
    const rootURL = (language !== this.props.site.language) ?
      `/lang-${language}` : '';
    const appProps = { language, site, rootURL };
    return (
      <div className='app'>
        <Helmet
          titleTemplate={'%s - ' + site.title}
          defaultTitle={site.title}
          link={[
            {
              rel: 'shortcut icon',
              type: 'image/x-icon',
              href: '/favicon.ico'
            }
          ]}
          meta={[
            {
              name: 'viewport',
              content: 'initial-scale=1, maximum-scale=1'
            },
            { name: 'description', content: site.description },
            { property: 'og:title', content: site.title },
            { property: 'og:description', content: site.description },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: rootURL + site.link.href },
            { property: 'og:image', content: site.image },
            { property: 'og:locale', content: language.replace(/-/g, '_') }
          ]}
        />
        <Header title={site.title} menu={site.menu} {...appProps} />
        <main>
          {cloneElement(this.props.children, appProps)}
        </main>
        <Footer copyright={site.copyright} {...appProps} />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  load: PropTypes.func,
  site: PropTypes.object,
  params: PropTypes.object
};

export default fetchData((store) => {
  return store.dispatch(load('site'));
})(connect(state => ({
  site: state.data && state.data.site
}), { load })(App));
