import { isObject, trim } from 'lodash';

const checkValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (Number.isNaN(Number(value))) {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree) => {
  const iter = (node, path) => {
    const result = node
      .filter((nnode) => nnode.status !== 'unmodified')
      .map((n) => {
        const newProperty = trim(`${path}.${n.key}`, '.');
        switch (n.status) {
          case 'modified':
            return `Property '${newProperty}' was changed from ${checkValue(n.oldValue)} to ${checkValue(n.newValue)}`;
          case 'added':
            return `Property '${newProperty}' was added with value: ${checkValue(n.value)}`;
          case 'deleted':
            return `Property '${newProperty}' was deleted`;
          case 'merged':
            return iter(n.children, newProperty);
          default:
            throw new Error(`Unknown node status! ${node.status} is wrong!`);
        }
      });
    return result.join('\n');
  };
  return iter(tree, '');
};


export default plain;
