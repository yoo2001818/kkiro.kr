// This represents how the value should be stored by metadata generator /
// loaded by client code.
const SCHEMA = {
  tags: 'tags',
  posts: 'posts',
  postEntries: {
    _each: ({ id }) => `post_${id}`
  },
  tagEntries: {
    _each: (_, tag) => `tag_${tag}`
  }
};

function processNode(data, schema, files) {
  if (schema == null) return data;
  if (typeof schema === 'string') {
    files[schema] = data;
    return;
  }
  let output = {};
  let outputDirty = false;
  for (let key in data) {
    if (schema[key] != null) {
      let schemaOutput = processNode(data[key], schema[key], files);
      if (schemaOutput != null) {
        output[key] = schemaOutput;
        outputDirty = true;
      }
    } else if (schema._each != null) {
      let filename = schema._each(data[key], key);
      if (filename != null) files[filename] = data[key];
    } else {
      output[key] = data[key];
      outputDirty = true;
    }
  }
  if (!outputDirty) return;
  return output;
}

export default function store(data) {
  let files = {};
  files.main = processNode(data, SCHEMA, files);
  console.log(files);
}
