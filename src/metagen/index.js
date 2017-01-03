import generate from './generate';
import separate from './separate';
import store from './store';

export default async function metagen(src, dest) {
  let metadata = await generate(src);
  let files = separate(metadata);
  store(files, dest);
}
