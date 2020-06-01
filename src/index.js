import { has, isObject } from 'lodash';
import formatterChoose from './formatters/index.js';
import { parsing } from './parsers.js';

// diffTree
export const makeDifferenceTree = (beforeConfig, afterConfig) => {
  const mergedObject = { ...beforeConfig, ...afterConfig };
  const entries = Object.entries(mergedObject);
  const result = entries.map(([key, value]) => {
    const property = key;
    const oldValue = beforeConfig[key];
    const newValue = afterConfig[key];
    if (has(beforeConfig, key) && has(afterConfig, key)) {
      if (isObject(oldValue) && isObject(newValue)) {
        return {
          property,
          status: 'merged',
          children: makeDifferenceTree(oldValue, newValue),
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
    }
    if (has(beforeConfig, key) && !has(afterConfig, key)) {
      return {
        property,
        status: 'deleted',
        value,
      };
    }
    return {
      property,
      status: 'added',
      value,
    };
  });
  return result;
};

const genDiff = (firstConfig, secondConfig, format) => {
  const diffTree = makeDifferenceTree(parsing(firstConfig), parsing(secondConfig));
  return formatterChoose(diffTree, format);
};

export default genDiff;
