import yaml from 'js-yaml';
import ini from 'ini';
import { isObject, isBoolean } from 'lodash';

const normalize = (config) => {
  const entries = Object.entries(config);
  const result = entries.reduce((acc, [key, value]) => {
    if (isObject(value)) {
      return { ...acc, [key]: normalize(value) };
    }
    if (isBoolean(value)) {
      return { ...acc, [key]: value };
    }
    if (Number.isNaN(Number(value))) {
      return { ...acc, [key]: value };
    }
    return { ...acc, [key]: Number(value) };
  }, {});
  return result;
};

const parsers = {
  '.json': JSON.parse,
  '.ini': ini.parse,
  '.yml': yaml.safeLoad,
};

export const parse = (type, fileData) => normalize(parsers[type](fileData));

export default parse;
