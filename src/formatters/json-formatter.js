import { isObject } from 'lodash';

const stringify = (data, lvl = 0) => {
  if (!isObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const result = keys.map((key) => (`{\n${' '.repeat(lvl)}${key}: ${stringify(data[key])}\n${' '.repeat(lvl - 4)}}`));
  return result;
};

const formatterJson = (tree, space = 4) => {
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
    return `${' '.repeat(space)}${node.name}: {\n${formatterJson(node.children, space + 4)}\n${' '.repeat(space)}}`;
  });
  return `${result.join('\n')}`;
};

export default formatterJson;
