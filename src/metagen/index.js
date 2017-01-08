import generate from './generate';
import separate from './separate';
import store from './store';

export default async function metagen(site, src, dest) {
  let metadata = await generate(site, src);
  let files = separate(metadata);
  await store(files, dest);
  return { metadata, files };
}
