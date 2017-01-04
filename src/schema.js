// This represents how the value should be stored by metadata generator /
// loaded by client code.
export default {
  tags: 'tags',
  posts: 'posts',
  postEntries: {
    _each: ({ id }) => `post-${id}`
  },
  tagEntries: {
    _each: (_, tag) => `tag-${tag}`
  }
};
