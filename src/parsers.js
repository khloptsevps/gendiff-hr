import yaml from 'js-yaml';
import ini from 'ini';
import { isObject } from 'lodash';

// for ini
const normalize = (config) => {
  const entries = Object.entries(config);
  const result = entries.reduce((acc, [key, value]) => {
    if (isObject(value)) {
      return { ...acc, [key]: normalize(value) };
    }
    if (typeof value === 'boolean') {
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

const getParser = (extention, fileData) => parsers[extention](fileData);

export const parse = (ext, fileData) => {
  const parseFile = getParser(ext, fileData);
  return ext === '.ini' ? normalize(parseFile) : parseFile;
};

export default parse;
