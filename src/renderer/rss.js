import pug from 'pug';
import path from 'path';
import marked from 'marked';
import mergeSite from '../util/mergeSite';

let renderRSSPug = pug.compileFile(path.resolve(__dirname, 'rss.pug'), {
  pretty: true
});

// Pretty much same as Atom code.
export default function renderRSS(data, language = data.site.language) {
  return renderRSSPug(Object.assign({}, data, {
    renderBrief: marked,
    site: mergeSite(data.site, language),
    language
  }));
}
