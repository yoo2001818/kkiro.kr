// Do we really need separate file for this?
export default function getLanguage(params, state) {
  return params.language || (state.data && state.data.site &&
    state.data.site.language) || 'en';
}
