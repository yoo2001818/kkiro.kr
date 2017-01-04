import SCHEMA from '../schema';

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

export default function separate(data) {
  let files = {};
  processNode({main: data}, {main: SCHEMA}, files);
  return files;
}
