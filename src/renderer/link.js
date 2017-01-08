export default function generateLinks(metadata) {
  let output = [
    '/',
    '/tags/'
  ];
  for (let id in metadata.postEntries) output.push(`/${id}/`);
  for (let id in metadata.tagEntries) output.push(`/tags/${id}/`);
  return output;
}
