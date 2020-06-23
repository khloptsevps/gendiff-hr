import {
  has,
  isObject,
  union,
  keys,
} from 'lodash';
import fs from 'fs';
import path from 'path';
import formatRender from './formatters/index.js';
import { parse } from './parsers.js';

// diffTree
export const makeDifferenceTree = (beforeConfig, afterConfig) => {
  const fileKeys = union(keys(beforeConfig), keys(afterConfig));
  const result = fileKeys.map((key) => {
    if (!has(afterConfig, key)) {
      return { key, status: 'deleted', value: beforeConfig[key] };
    }
    if (!has(beforeConfig, key)) {
      return { key, status: 'added', value: afterConfig[key] };
    }
    const oldValue = beforeConfig[key];
    const newValue = afterConfig[key];
    if (oldValue !== newValue) {
      const modifiedOrObject = isObject(oldValue) && isObject(newValue) ? { key, status: 'merged', children: makeDifferenceTree(oldValue, newValue) }
        : {
          key,
          status: 'modified',
          oldValue,
          newValue,
        };
      return modifiedOrObject;
    }
    return { key, status: 'unmodified', value: oldValue };
  });
  return result;
};

const makeFileData = (pathToFile) => {
  const data = fs.readFileSync(path.resolve(pathToFile), 'utf-8');
  const type = path.extname(pathToFile);

  return { data, type };
};

const genDiff = (pathToFile1, pathToFile2, format) => {
  const beforeConfig = makeFileData(pathToFile1);
  const afterConfig = makeFileData(pathToFile2);

  const parseBefore = parse(beforeConfig.type, beforeConfig.data);
  const parseAfter = parse(afterConfig.type, afterConfig.data);

  const diffTree = makeDifferenceTree(parseBefore, parseAfter);
  const result = formatRender(diffTree, format);

  return result;
};

export default genDiff;
