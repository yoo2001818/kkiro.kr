import pug from 'pug';
import path from 'path';
import marked from 'marked';

let renderRSSPug = pug.compileFile(path.resolve(__dirname, 'rss.pug'), {
  pretty: true
});

// Pretty much same as Atom code.
export default function renderRSS(data) {
  return renderRSSPug(Object.assign({}, data, {
    posts: data.posts.map(post => Object.assign({}, post, {
      briefHTML: marked(post.brief)
    }))
  }));
}
