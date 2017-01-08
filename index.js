import config from './blog.config.js';
import generate from './src/generate';

generate(config, process.argv[2] !== 'rebuild')
.catch(e => {
  console.log(e.stack);
  throw e;
});
