// This represents how the value should be stored by metadata generator /
// loaded by client code.
export default {
  _self: false,
  tags: 'tags',
  posts: 'posts',
  postEntries: {
    _self: false,
    _each: id => `post-${id}`
  },
  tagEntries: {
    _self: false,
    _each: tag => `tag-${tag}`
  }
};
