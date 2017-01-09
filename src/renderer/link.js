export default function generateLinks(metadata) {
  let languages = [metadata.site.language].concat(
    Object.keys(metadata.site.languages));
  let output = [];
  languages.forEach(lang => {
    let url = lang === metadata.site.language ? '' : `/lang-${lang}`;
    output.push(`${url}/`);
    output.push(`${url}/tags/`);
    for (let id in metadata.postEntries[lang]) output.push(`${url}/${id}/`);
    for (let id in metadata.tagEntries[lang]) output.push(`${url}/tags/${id}/`);
  });
  return output;
}
