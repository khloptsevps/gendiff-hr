import plain from './plain.js';
import json from './json.js';
import stylish from './stylish.js';

const formatterChoose = (tree, format) => {
  switch (format) {
    case 'plain':
      return `${plain(tree, [])}`;
    case 'json':
      return json(tree);
    default:
      return stylish(tree);
  }
};

export default formatterChoose;
