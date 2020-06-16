import { isObject } from 'lodash';

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
  const iter = (node, acc) => {
    const result = node
      .filter((nnode) => nnode.status !== 'unmodified')
      .map((n) => {
        const property = (!n.children) ? n.property : [...acc, n.property];
        const newProperty = [acc, property].flat().join('.');
        if (n.children) {
          return iter(n.children, property);
        }
        if (n.status === 'added') {
          return `Property '${newProperty}' was added with value: ${checkValue(n.value)}`;
        }
        if (n.status === 'modified') {
          return `Property '${newProperty}' was changed from ${checkValue(n.oldValue)} to ${checkValue(n.newValue)}`;
        }
        return `Property '${newProperty}' was deleted`;
      });
    return result.join('\n');
  };
  return iter(tree, []);
};


export default plain;
