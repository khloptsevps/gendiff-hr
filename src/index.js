import {
  has,
  isObject,
  union,
  keys,
} from 'lodash';
import fs from 'fs';
import path from 'path';
import buildFormat from './formatters/index.js';
import { parse } from './parsers.js';

// diffTree
export const makeDifferenceTree = (beforeConfig, afterConfig) => {
  const properties = union(keys(beforeConfig), keys(afterConfig));
  const result = properties.map((property) => {
    const oldValue = beforeConfig[property];
    const newValue = afterConfig[property];
    if (oldValue === newValue) {
      return { property, status: 'unmodified', value: oldValue };
    }
    if (!has(beforeConfig, property)) {
      return { property, status: 'added', value: newValue };
    }
    if (!has(afterConfig, property)) {
      return { property, status: 'deleted', value: oldValue };
    }
    if (has(beforeConfig, property) && has(afterConfig, property)
     && isObject(oldValue) && isObject(newValue)) {
      return { property, status: 'merged', children: makeDifferenceTree(oldValue, newValue) };
    }
    return {
      property,
      status: 'modified',
      oldValue,
      newValue,
    };
  });
  return result;
};

const getFileData = (pathToFile) => {
  const data = fs.readFileSync(path.resolve(pathToFile), 'utf-8');
  const type = path.extname(pathToFile);

  return { data, type };
};

const genDiff = (pathToFile1, pathToFile2, format) => {
  const beforeConfig = getFileData(pathToFile1);
  const afterConfig = getFileData(pathToFile2);

  const parseBefore = parse(beforeConfig.type, beforeConfig.data);
  const parseAfter = parse(afterConfig.type, afterConfig.data);

  const diffTree = makeDifferenceTree(parseBefore, parseAfter);
  const result = buildFormat(diffTree, format);

  return result;
};

export default genDiff;
