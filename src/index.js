import { has } from 'lodash';
import { parsing } from './parsers.js';

// genDiff
const genDiff = (firstPath, secondPath) => {
  const firstConfig = parsing(firstPath);
  const secondConfig = parsing(secondPath);
  const firstKeys = Object.keys(firstConfig);
  const secondKeys = Object.keys(secondConfig);
  const combineKeys = secondKeys.reduce((acc, item) => {
    if (!has(firstConfig, item)) {
      acc.push(item);
    }
    return acc;
  }, [...firstKeys]);
  const difference = combineKeys.reduce((acc, key) => {
    if (has(firstConfig, key) && has(secondConfig, key)) {
      if (firstConfig[key] === secondConfig[key]) {
        acc.push(`    ${key}: ${firstConfig[key]}`);
      } else {
        acc.push(`  - ${key}: ${firstConfig[key]}`);
        acc.push(`  + ${key}: ${secondConfig[key]}`);
      }
    } else if ((has(firstConfig, key) && !has(secondConfig, key))) {
      acc.push(`  - ${key}: ${firstConfig[key]}`);
    } else {
      acc.push(`  + ${key}: ${secondConfig[key]}`);
    }
    return acc;
  }, []);
  return `{\n${difference.join('\n')}\n}`;
};

export default genDiff;
