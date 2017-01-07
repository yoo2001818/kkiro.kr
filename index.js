import config from './blog.config.js';
import metagen from './src/metagen';

metagen(config.site, config.source, config.metadata);
