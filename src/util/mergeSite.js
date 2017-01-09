export default function mergeSite(site, language) {
  if (site.language === language) return site;
  return Object.assign({}, site, site.languages[language]);
}
