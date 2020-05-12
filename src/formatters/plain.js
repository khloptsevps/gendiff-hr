import { isObject, isNaN } from 'lodash';

const checkValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof (value) === 'boolean') {
    return value;
  }
  if (isNaN(Number(value))) {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree, acc) => {
  const result = tree
    .filter((node) => node.status !== 'unmodified')
    .map((node) => {
      const property = (!node.children) ? `${node.name}` : [...acc, node.name];
      const newProperty = [acc, node.name].flat().join('.');
      if (!node.children) {
        if (node.status === 'deleted') {
          return `Property '${newProperty}' was deleted`;
        }
        if (node.status === 'added') {
          return `Property '${newProperty}' was added with value: ${checkValue(node.value)}`;
        }
        if (node.status === 'modified') {
          return `Property '${newProperty}' was changed from ${checkValue(node.before)} to ${checkValue(node.after)}`;
        }
      }
      return plain(node.children, property);
    })
    .join('\n');
  return result;
};


export default plain;
