import { isObject } from 'lodash';

const tab = (z) => '    '.repeat(z);

const stringify = (value, lvl) => {
  if (!isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => (`{\n${tab(lvl + 2)}${key}: ${stringify(value[key])}\n${tab(lvl + 1)}}`));
  return result;
};

const buildTreeFormat = (tree, level = 0) => {
  const result = tree.map((node) => {
    if (node.status === 'unmodified') {
      return `    ${tab(level)}${node.property}: ${stringify(node.value, level)}`;
    }
    if (node.status === 'modified') {
      return [
        `  ${tab(level)}- ${node.property}: ${stringify(node.oldValue, level)}`,
        `  ${tab(level)}+ ${node.property}: ${stringify(node.newValue, level)}`,
      ].join('\n');
    }
    if (node.status === 'added') {
      return `  ${tab(level)}+ ${node.property}: ${stringify(node.value, level)}`;
    }
    if (node.status === 'deleted') {
      return `  ${tab(level)}- ${node.property}: ${stringify(node.value, level)}`;
    }
    return `${tab(level + 1)}${node.property}: {\n${buildTreeFormat(node.children, level + 1)}\n${tab(level + 1)}}`;
  });
  return result.join('\n');
};

export default (tree) => `{\n${buildTreeFormat(tree)}\n}`;
