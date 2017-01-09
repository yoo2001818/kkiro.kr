import pug from 'pug';
import path from 'path';
import marked from 'marked';

let renderRSSPug = pug.compileFile(path.resolve(__dirname, 'rss.pug'), {
  pretty: true
});

// Pretty much same as Atom code.
export default function renderRSS(data) {
  return renderRSSPug(Object.assign({}, data, {
    renderBrief: marked,
    // Temporary patch until finished
    language: 'en'
  }));
}
