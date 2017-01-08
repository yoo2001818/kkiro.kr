import del from 'del';
import fs from 'fs-promise';
import path from 'path';
import mkdirp from 'mkdirp';
import metagen from './metagen';
import webpack from 'webpack';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import { ncp } from 'ncp';
import renderLink from './renderer/link';
import renderAtom from './renderer/atom';
import renderRSS from './renderer/rss';

import webpackConfig from '../webpack.config';
import webpackIsomorphicToolsConfig from '../webpack-isomorphic-tools.config';

export default async function generate(config) {
  console.log('Starting static website generation');
  // Clean up output
  console.log('Cleaning up ' + config.output);
  await del([path.resolve(config.output, '**')]);
  await fs.mkdir(config.output);
  // Generate metadata
  console.log('Generating metadata');
  const metadataDir = path.resolve(config.output, 'metadata');
  await fs.mkdir(metadataDir);
  let { metadata, files } = await
    metagen(config.site, config.source, metadataDir);
  // Run webpack
  console.log('Building webpack bundle');
  let stats = await new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) return reject(err);
      resolve(stats);
    });
  });
  // Copy media folder
  console.log('Copying media folder');
  await new Promise((resolve, reject) => {
    ncp(config.media, path.resolve(config.output, 'media'), err => {
      if (err) reject(err);
      resolve();
    });
  });
  // Load React renderer
  console.log('Loading React renderer');
  const renderReact = await new Promise((resolve) => {
    new WebpackIsomorphicTools(webpackIsomorphicToolsConfig)
    .server(webpackConfig.context, () => {
      // Require and resolve
      resolve(require('./renderer/react').default);
    });
  });
  // Render React to html
  console.log('Rendering HTML');
  let links = renderLink(metadata);
  for (let link of links) {
    // This is only renderer that runs asynchronusly
    let result = await renderReact(link, files, webpackConfig.output.publicPath,
      stats);
    // Save each file to the result
    let dir = path.resolve(config.output, link.slice(1));
    // Create directory...
    await new Promise((resolve, reject) => mkdirp(dir, (err) => {
      if (err) return reject(err);
      resolve();
    }));
    // Then save the file.
    await fs.writeFile(path.resolve(dir, 'index.html'), result);
  }
  // Render Atom / RSS
  console.log('Rendering Atom / RSS feed');
  await fs.writeFile(path.resolve(config.output, 'atom.xml'),
    renderAtom(metadata));
  await fs.writeFile(path.resolve(config.output, 'rss.xml'),
    renderRSS(metadata));
  console.log('All done!');
}
