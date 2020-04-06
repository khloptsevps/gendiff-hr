import path from 'path';
import fs from 'fs';
import { has } from 'lodash';

const getConfig = (pathto) => JSON.parse(fs.readFileSync(path.resolve(pathto)));

// genDiff
const genDiff = (firstPath, secondPath) => {
  const firstJson = getConfig(firstPath);
  const secondJson = getConfig(secondPath);
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
      acc.push(`  - ${key}: ${firstJson[key]}`);
    } else {
      acc.push(`  + ${key}: ${secondJson[key]}`);
    }
    return acc;
  }, []);
  return `{\n${difference.join('\n')}\n}`;
};

export default genDiff;
