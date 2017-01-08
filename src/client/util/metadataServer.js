export default function metadataServer(files) {
  return resId => files[resId] || false;
}
