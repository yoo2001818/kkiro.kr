import generate from './generate';
import separate from './separate';
import watch from 'watch';

export default function server(src) {
  let data = {};
  async function regenerate() {
    console.log('Rebuilding...');
    let metadata = await generate(src);
    data = separate(metadata);
  }
  regenerate();

  watch.watchTree(src, regenerate);

  // Serve on-memory
  return (req, res, next) => {
    let { path, method } = req;
    if (method !== 'GET') return next();
    let match = /\/(.+)\.json$/.exec(path);
    if (match == null) return next();
    let url = match[1];
    if (data[url] != null) res.json(data[url]);
    else next();
  };
}
