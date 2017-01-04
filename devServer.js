import config from './blog.config.js';
import devServer from './src/metagen/devServer';
import express from 'express';

let app = express();
app.use(devServer(config.source));

app.listen(3000, () => console.log('Server started at port 3000'));
