export default function metadataServer(files) {
  return resId => Promise.resolve(files[resId] || false);
}
