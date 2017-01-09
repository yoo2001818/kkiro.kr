import './post.scss';

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import fetchData from '../util/fetchData';
import fetchLanguage from '../util/fetchLanguage';

import { load } from '../action/data';

import Link from 'react-router/lib/Link';
import Helmet from 'react-helmet';
import Loading from './loading';
import NotFound from './notFound';
import PostCard from '../component/postCard';

class PostView extends Component {
  componentDidUpdate() {
    if (location.hash !== '') {
      setTimeout(() => {
        let node = document.querySelector(
          `a[name="${location.hash.slice(1)}"]`);
        if (node) node.scrollIntoView();
      }, 0);
      return false;
    }
  }
  render() {
    const { postEntries, site, params, rootURL } = this.props;
    const post = postEntries && postEntries[params.id];
    if (post === false) {
      return (
        <NotFound />
      );
    }
    if (post == null) {
      return (
        <Loading />
      );
    }
    return (
      <div className='post-view'>
        <Helmet title={post.title}
          meta={[
            { name: 'description', content: post.title },
            { property: 'og:title', content: post.title },
            { property: 'og:type', content: 'article' },
            { property: 'og:image', content: post.image || site.image },
            { property: 'og:url', content:
              rootURL + site.link.href + post.id + '/' },
            // TODO This doesn't seem right
            { property: 'og:description', content: post.brief },
            { property: 'og:locale', content: (post.language ||
              site.language).replace(/-/g, '_') },
            { property: 'article:published_time', content:
              new Date(post.published).toISOString() },
            { property: 'article:modified_time', content:
              new Date(post.updated).toISOString() },
            { property: 'article:author', content:
              (post.author && post.author.name) ||
              (site.author && site.author.name) },
          ].concat(post.tags.map(tag => ({
            property: 'article:tag', content: tag
          })))}
        />
        <PostCard post={post} full rootURL={rootURL} />
        { post.layout !== 'page' && (
          <Link to={`${rootURL}/`} className='back'>Back to list</Link>
        )}
      </div>
    );
  }
}

PostView.propTypes = {
  site: PropTypes.object,
  postEntries: PropTypes.object,
  load: PropTypes.func,
  params: PropTypes.object,
  rootURL: PropTypes.string
};

export default fetchData(fetchLanguage((store, { params }, language) => {
  return store.dispatch(load('postEntries', language, params.id));
}))(connect((state, props) => ({
  postEntries: state.data && state.data.postEntries &&
    state.data.postEntries[props.language]
}), { load })(PostView));
