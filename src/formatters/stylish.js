import { isObject } from 'lodash';

const tab = (level) => '    '.repeat(level);

const stringify = (value, lvl) => {
  if (!isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => (`{\n${tab(lvl + 2)}${key}: ${stringify(value[key])}\n${tab(lvl + 1)}}`));
  return result;
};

const buildTreeFormat = (tree, level = 0) => {
  const result = tree.flatMap((node) => {
    switch (node.status) {
      case 'unmodified':
        return `    ${tab(level)}${node.key}: ${stringify(node.value, level)}`;
      case 'modified':
        return [
          `  ${tab(level)}- ${node.key}: ${stringify(node.oldValue, level)}`,
          `  ${tab(level)}+ ${node.key}: ${stringify(node.newValue, level)}`,
        ];
      case 'added':
        return `  ${tab(level)}+ ${node.key}: ${stringify(node.value, level)}`;
      case 'deleted':
        return `  ${tab(level)}- ${node.key}: ${stringify(node.value, level)}`;
      case 'merged':
        return `${tab(level + 1)}${node.key}: {\n${buildTreeFormat(node.children, level + 1)}\n${tab(level + 1)}}`;
      default:
        throw new Error(`Unknown node status! ${node.status} is wrong!`);
    }
  });
  return result.join('\n');
};

export default (tree) => `{\n${buildTreeFormat(tree)}\n}`;
