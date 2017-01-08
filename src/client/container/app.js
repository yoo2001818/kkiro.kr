import './app.scss';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { load } from '../action/data';

import Helmet from 'react-helmet';

import LoadComponent from '../component/loadComponent';
import Header from '../component/header';
import Footer from '../component/footer';

class App extends LoadComponent {
  load(props) {
    props.load('site');
  }
  render() {
    const { site } = this.props;
    return (
      <div className='app'>
        <Helmet
          titleTemplate={site && ('%s - ' + site.title)}
          defaultTitle={site && site.title}
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
            { name: 'description', content: site && site.description },
            { property: 'og:title', content: site && site.title },
            { property: 'og:description', content: site && site.description },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: site && site.link.href },
            { property: 'og:image', content: site && site.image },
            { property: 'og:locale', content: site &&
              site.language.replace(/-/g, '_') }
          ]}
        />
        <Header title={site && site.title} menu={site && site.menu} />
        <main>
          {this.props.children}
        </main>
        <Footer copyright={site && site.copyright}/>
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
