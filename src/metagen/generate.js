import fs from 'fs-promise';
import glob from 'glob-promise';
import frontMatter from 'front-matter';
import slug from 'slug';
import leftPad from 'left-pad';

function generateSlug(metadata) {
  if (metadata.slug != null) return metadata.slug;
  const { date } = metadata;
  const yyyy = leftPad(date.getFullYear(), 4, 0);
  const mm = leftPad(date.getMonth() + 1, 2, 0);
  const dd = leftPad(date.getDate(), 2, 0);
  const dateStr = [yyyy, mm, dd].join('-');
  return dateStr + '-' + slug(metadata.title, { lower: true });
}

// Actually, this whole code should be provided by end user
export default async function generate() {
  let files = await glob('posts/**/*.md');

  let postsFull = await Promise.all(files.map(async file => {
    const data = await fs.readFile(file, 'utf-8');
    const content = frontMatter(data);
    let metadata = content.attributes;
    metadata.date = new Date(metadata.date);
    if (metadata.tags != null) {
      metadata.tags = metadata.tags.split(/,\s*/);
    } else {
      metadata.tags = [];
    }
    metadata.id = generateSlug(metadata);
    metadata.content = content.body;
    return metadata;
  }));
  // Sort the posts in date order, newest first.
  postsFull.sort((a, b) => b.date.getTime() - a.date.getTime());
  // Generate full post entries
  let postEntries = {};
  for (let post of postsFull) {
    postEntries[post.id] = post;
  }
  // Strip post data
  let posts = postsFull.map(({ id, title, tags, date }) =>
    ({ id, title, tags, date }));
  // Generate tag entries
  let tagEntries = {};
  for (let post of posts) {
    for (let tag of post.tags) {
      if (tagEntries[tag] == null) tagEntries[tag] = [];
      tagEntries[tag].push(post);
    }
  }
  let tags = Object.keys(tagEntries);
  let output = { postEntries, posts, tagEntries, tags };
  console.log(output);
  return output;
}
