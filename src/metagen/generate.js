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

  // Set up languages first
  let languages = [site.language].concat(Object.keys(site.languages));

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
    metadata.language = metadata.language || site.language;
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
  // TODO Should install fallback if specified language version is missing
  let postEntries = {};
  for (let post of postsFull) {
    if (postEntries[post.language] == null) postEntries[post.language] = {};
    postEntries[post.language][post.id] = post;
  }
  let posts = {};
  let tagEntries = {};
  let tags = {};
  // Set up post data for each language
  languages.forEach(language => {
    // Strip post data
    posts[language] = postsFull.map(post => {
      let newPost = Object.assign({}, post);
      delete newPost.content;
      return newPost;
    }).filter(post => !post.hidden && post.language === language);
    // Generate tag entries
    let langTagEntries = tagEntries[language] = {};
    for (let post of posts[language]) {
      if (post.language !== language) continue;
      for (let tag of post.tags) {
        if (langTagEntries[tag] == null) langTagEntries[tag] = [];
        langTagEntries[tag].push(post);
      }
    }
    let langTags = tags[language] = Object.keys(langTagEntries).map(v => ({
      name: v, length: langTagEntries[v].length }));
    langTags.sort((a, b) => {
      let lengthSort = b.length - a.length;
      if (lengthSort !== 0) return lengthSort;

      let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  });
  site = Object.assign({}, site, {
    updated: new Date(lastUpdated).toISOString()
  });
  let output = { postEntries, posts, tagEntries, tags, site };
  return output;
}
