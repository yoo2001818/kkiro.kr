import generate from './generate';
import store from './store';

async function metagen() {
  let metadata = await generate();
  store(metadata);
}

export default metagen;

// Run the function if it's the entry point.
if (require.main === module) metagen();
