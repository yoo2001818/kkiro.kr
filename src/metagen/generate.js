import path from 'path';
import fs from 'fs-promise';
import glob from 'glob-promise';
import frontMatter from 'front-matter';
import slug from 'slug';
import formatDate from '../util/formatDate';

function generateSlug(metadata) {
  if (metadata.slug != null) return metadata.slug;
  const { published } = metadata;
  return formatDate(published) + '-' + slug(metadata.title, { lower: true });
}

// Actually, this whole code should be provided by end user
export default async function generate(site, src) {
  let files = await glob(path.resolve(src, '**/*.md'));
  let lastUpdated = 0;

  let postsFull = await Promise.all(files.map(async file => {
    const data = await fs.readFile(file, 'utf-8');
    const content = frontMatter(data);
    let metadata = content.attributes;
    // Some mutation hell
    // TODO Fix it
    let updated = metadata.updated || metadata.published;
    metadata.published = new Date(metadata.published);
    metadata.updated = new Date(updated);
    let timestamp = metadata.updated.getTime();
    if (lastUpdated < timestamp) lastUpdated = timestamp;
    // Set tags
    if (metadata.tags != null) {
      metadata.tags = metadata.tags.split(/,\s*/);
    } else {
      metadata.tags = [];
    }
    metadata.id = generateSlug(metadata);
    metadata.content = content.body;
    metadata.renderer = metadata.renderer || 'markdown';
    // Find <hr /> tag to create 'Read more...'
    {
      let result = /^\s+([\-_]\s*){3,}$/m.exec(metadata.content);
      if (result != null) {
        metadata.brief = metadata.content.slice(0, result.index);
        metadata.more = true;
      } else {
        metadata.brief = metadata.content;
        metadata.more = false;
      }
    }
    return metadata;
  }));
  postsFull.reverse();
  // Sort the posts in date order, newest first.
  postsFull.sort((a, b) => b.published.getTime() - a.published.getTime());
  // Generate full post entries
  let postEntries = {};
  for (let post of postsFull) {
    postEntries[post.id] = post;
  }
  // Strip post data
  let posts = postsFull.map(post => {
    let newPost = Object.assign({}, post);
    delete newPost.content;
    return newPost;
  });
  // Generate tag entries
  let tagEntries = {};
  for (let post of posts) {
    for (let tag of post.tags) {
      if (tagEntries[tag] == null) tagEntries[tag] = [];
      tagEntries[tag].push(post);
    }
  }
  let tags = Object.keys(tagEntries);
  site = Object.assign({}, site, {
    updated: new Date(lastUpdated).toISOString()
  });
  let output = { postEntries, posts, tagEntries, tags, site };
  return output;
}
