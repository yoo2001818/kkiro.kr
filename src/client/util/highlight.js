import highlight from 'highlight.js/lib/highlight';
import * as languages from './highlightLanguages';

// I don't want to use all languages. Ugh
for (let key in languages) {
  highlight.registerLanguage(key, languages[key]);
}

export default highlight;
