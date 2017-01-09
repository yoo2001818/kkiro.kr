// This represents how the value should be stored by metadata generator /
// loaded by client code.
export default {
  _self: false,
  site: 'site',
  tags: {
    _self: false,
    _each: lang => `tags-${lang}`
  },
  posts: {
    _self: false,
    _each: lang => `posts-${lang}`
  },
  postEntries: {
    _self: false,
    _each: {
      _self: false,
      _each: (id, lang) => `post-${id}-${lang}`
    }
  },
  tagEntries: {
    _self: false,
    _each: {
      _self: false,
      _each: (tag, lang) => `tag-${tag}-${lang}`
    }
  }
};
