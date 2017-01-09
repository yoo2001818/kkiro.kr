import pug from 'pug';
import path from 'path';
import marked from 'marked';
import mergeSite from '../util/mergeSite';

let renderAtomPug = pug.compileFile(path.resolve(__dirname, 'atom.pug'), {
  pretty: true
});

export default function renderAtom(data, language = data.site.language) {
  return renderAtomPug(Object.assign({}, data, {
    renderBrief: marked,
    site: mergeSite(data.site, language),
    language
  }));
}
