import { has, isObject } from 'lodash';
import fs from 'fs';
import path from 'path';
import getFormatter from './formatters/index.js';
import { parse } from './parsers.js';

// diffTree
export const makeDifferenceTree = (beforeConfig, afterConfig) => {
  const entries = Object.entries({ ...beforeConfig, ...afterConfig });
  const result = entries.map(([property, value]) => {
    const oldValue = beforeConfig[property];
    const newValue = afterConfig[property];
    if (isObject(oldValue) && isObject(newValue)) {
      return {
        property,
        status: 'merged',
        children: makeDifferenceTree(oldValue, newValue),
      };
    }
    if (has(afterConfig, property) && !has(beforeConfig, property)) {
      return {
        property,
        status: 'added',
        value,
      };
    }
    if (has(beforeConfig, property) && !has(afterConfig, property)) {
      return {
        property,
        status: 'deleted',
        value,
      };
    }
    if (oldValue === newValue) {
      return {
        property,
        status: 'unmodified',
        value,
      };
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
  const ext = path.extname(pathToFile);

  return { data, ext };
};

const genDiff = (pathToFile1, pathToFile2, format) => {
  const beforeConfig = getFileData(pathToFile1);
  const afterConfig = getFileData(pathToFile2);

  const parseBefore = parse(beforeConfig.ext, beforeConfig.data);
  const parseAfter = parse(afterConfig.ext, afterConfig.data);

  const diffTree = makeDifferenceTree(parseBefore, parseAfter);
  const result = getFormatter(diffTree, format);

  return result;
};

export default genDiff;
