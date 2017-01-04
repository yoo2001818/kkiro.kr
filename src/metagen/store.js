import path from 'path';
import fs from 'fs-promise';

// Stores metadata into json files
export default async function store(data, dest) {
  await Promise.all(Object.keys(data).map(async key => {
    let output = JSON.stringify(data[key]);
    await fs.writeFile(path.resolve(dest, key + '.json'), output);
  }));
}
