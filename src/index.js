import { has, union, isObject } from 'lodash';
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

const stringify = (data, lvl = 0) => {
  if (!isObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const result = keys.map((key) => (`{\n${' '.repeat(lvl)}${key}: ${stringify(data[key])}\n${' '.repeat(lvl - 4)}}`));
  return result;
};

const plain = (tree, space = 4) => {
  const result = tree.map((node) => {
    if (node.status === 'unmodified') {
      const spaceCount = space;
      return `${' '.repeat(spaceCount) + node.name}: ${stringify(node.value, space + 4)}`;
    }
    if (node.status === 'modified') {
      const spaceCount = space - 2;
      return [
        `${' '.repeat(spaceCount)}- ${node.name}: ${stringify(node.before, space + 4)}`,
        `${' '.repeat(spaceCount)}+ ${node.name}: ${stringify(node.after, space + 4)}`,
      ].join('\n');
    }
    if (node.status === 'added') {
      const spaceCount = space - 2;
      return `${' '.repeat(spaceCount)}+ ${node.name}: ${stringify(node.value, space + 4)}`;
    }
    if (node.status === 'deleted') {
      const spaceCount = space - 2;
      return `${' '.repeat(spaceCount)}- ${node.name}: ${stringify(node.value, space + 4)}`;
    }
    return `${' '.repeat(space)}${node.name}: {\n${plain(node.children, space + 4)}\n${' '.repeat(space)}}`;
  });
  return `${result.join('\n')}`;
};

const genDiff = (firstConfig, secondConfig, format) => {
  const diffTree = makeDifferenceTree(parsing(firstConfig), parsing(secondConfig));
  switch (format) {
    case 'pretty':
      return 'work in process';
    default:
      return `{\n${plain(diffTree)}\n}`;
  }
};

export default genDiff;
