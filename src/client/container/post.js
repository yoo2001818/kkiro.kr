import './post.scss';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';

import { load } from '../action/data';

import Helmet from 'react-helmet';
import LoadComponent from '../component/loadComponent';
import Loading from './loading';
import NotFound from './notFound';
import PostCard from '../component/postCard';

class PostView extends LoadComponent {
  load(props) {
    props.load('postEntries', 'en', props.params.id);
  }
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
    const { postEntries, site, params } = this.props;
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
            { property: 'og:image', content: post.image ||
              (site && site.image) },
            { property: 'og:url', content:
              (site && site.link.href) + post.id + '/' },
            // TODO This doesn't seem right
            { property: 'og:description', content: post.brief },
            { property: 'og:locale', content: (post.language ||
              (site && site.language)).replace(/-/g, '_') },
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
        <PostCard post={post} full />
        { post.layout !== 'page' && (
          <Link to='/' className='back'>Back to list</Link>
        )}
      </div>
    );
  }
}

PostView.propTypes = {
  site: PropTypes.object,
  postEntries: PropTypes.object,
  load: PropTypes.func,
  params: PropTypes.object
};

export default connect(state => ({
  site: state.data && state.data.site,
  postEntries: state.data && state.data.postEntries &&
    state.data.postEntries.en
}), { load })(PostView);
