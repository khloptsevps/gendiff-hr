import { has, union, isObject } from 'lodash';
import formatterTree from './formatters/tree-formatter.js';
import formatterJson from './formatters/json-formatter.js';
import plain from './formatters/plain-formatter.js';
import { parsing } from './parsers.js';

// diffTree
export const makeDifferenceTree = (beforeConfig, afterConfig) => {
  const keys = union(Object.keys(beforeConfig), Object.keys(afterConfig));
  const result = keys.reduce((acc, key) => {
    if (has(beforeConfig, key) && has(afterConfig, key)) {
      if (isObject(beforeConfig[key]) && isObject(afterConfig[key])) {
        acc.push({ name: key, children: makeDifferenceTree(beforeConfig[key], afterConfig[key]) });
        return acc;
      }
      acc.push(beforeConfig[key] === afterConfig[key] ? {
        name: key,
        status: 'unmodified',
        value: afterConfig[key],
      } : {
        name: key,
        status: 'modified',
        before: beforeConfig[key],
        after: afterConfig[key],
      });
    } else if (has(beforeConfig, key) && !has(afterConfig, key)) {
      acc.push({ name: key, status: 'deleted', value: beforeConfig[key] });
    } else {
      acc.push({ name: key, status: 'added', value: afterConfig[key] });
    }
    return acc;
  }, []);
  return result;
};

const genDiff = (firstConfig, secondConfig, format) => {
  const diffTree = makeDifferenceTree(parsing(firstConfig), parsing(secondConfig));
  switch (format) {
    case 'plain':
      return `${plain(diffTree, [])}`;
    case 'json':
      return formatterJson(diffTree);
    default:
      return `{\n${formatterTree(diffTree)}\n}`;
  }
};

export default genDiff;
