require('regenerator-runtime/runtime');

var config = require('./blog.config.js');
var generate = require('./lib/generate').default;

generate(config, process.argv[2] !== 'rebuild')
.catch(e => {
  console.log(e.stack);
  throw e;
});
