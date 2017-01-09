import pug from 'pug';
import path from 'path';
import marked from 'marked';

let renderAtomPug = pug.compileFile(path.resolve(__dirname, 'atom.pug'), {
  pretty: true
});

export default function renderAtom(data) {
  // We need to render markdown
  // TODO This renders markdown each time the atom.xml is accessed, prehaps
  // we can change it? Though it'd be meaningless because caching atom.xml
  // is much much better
  return renderAtomPug(Object.assign({}, data, {
    renderBrief: marked,
    // Temporary patch until finished
    language: 'en'
  }));
}
