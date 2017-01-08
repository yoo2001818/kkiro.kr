export default function metadataClient(resId) {
  return fetch('/metadata/' + resId + '.json')
  .then(res => {
    if (res.status == 200) return res.json();
    else if (res.status === 404) return false;
    else throw res;
  });
}
