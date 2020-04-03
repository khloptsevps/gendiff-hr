import path from 'path';
import fs from 'fs';
import { has } from 'lodash';

// genDiff
const genDiff = (firstPath, secondPath) => {
  const firstJson = JSON.parse(fs.readFileSync(path.resolve(firstPath)));
  const secondJson = JSON.parse(fs.readFileSync(path.resolve(secondPath)));
  const firstKeys = Object.keys(firstJson);
  const secondKeys = Object.keys(secondJson);
  const combineKeys = secondKeys.reduce((acc, item) => {
    if (!has(firstJson, item)) {
      acc.push(item);
    }
    return acc;
  }, [...firstKeys]);
  const difference = combineKeys.reduce((acc, key) => {
    if (has(firstJson, key) && has(secondJson, key)) {
      if (firstJson[key] === secondJson[key]) {
        acc.push(`    ${key}: ${firstJson[key]}`);
      } else {
        acc.push(`  - ${key}: ${firstJson[key]}`);
        acc.push(`  + ${key}: ${secondJson[key]}`);
      }
    } else if ((has(firstJson, key) && !has(secondJson, key))) {
      console.log(key);
      acc.push(`  - ${key}: ${firstJson[key]}`);
    } else {
      acc.push(`  + ${key}: ${secondJson[key]}`);
    }
    return acc;
  }, []);
  console.log(`{\n${difference.join('\n')}\n}`);
};

export default genDiff;
