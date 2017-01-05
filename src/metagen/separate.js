import SCHEMA from '../schema';

function processNode(data, schema, files, keys) {
  if (schema == null) return data;
  if (typeof schema === 'string') {
    files[schema] = data;
    return;
  }
  if (typeof schema === 'function') {
    let filename = schema.apply(null, keys);
    if (filename != null) files[filename] = data;
    return;
  }
  let output = {};
  let outputDirty = false;
  for (let key in data) {
    let currentKeys = [key].concat(keys);
    let schemaOutput;
    if (schema[key] != null) {
      schemaOutput = processNode(data[key], schema[key], files, currentKeys);
    } else if (schema._each != null) {
      schemaOutput = processNode(data[key], schema._each, files, currentKeys);
    } else {
      schemaOutput = data[key];
    }
    if (schemaOutput != null) {
      output[key] = schemaOutput;
      outputDirty = true;
    }
  }
  if (!outputDirty) return;
  return output;
}

export default function separate(data) {
  let files = {};
  processNode({main: data}, {main: SCHEMA}, files, []);
  return files;
}
