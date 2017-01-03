import config from './blog.config.js';
import metagen from './src/metagen';

metagen(config.source, config.metadata);
