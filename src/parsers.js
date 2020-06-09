import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import { isObject, isNaN } from 'lodash';

// for ini
const normalize = (config) => {
  const entries = Object.entries(config);
  const result = entries.reduce((acc, [key, value]) => {
    if (isObject(value)) {
      return { ...acc, [key]: normalize(value) };
    }
    if (typeof (value) === 'boolean') {
      return { ...acc, [key]: value };
    }
    if (isNaN(Number(value))) {
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

export const parsing = (config) => {
  const fileData = fs.readFileSync(path.resolve(config), 'utf-8');

  const ext = path.extname(config);
  if (!parsers[ext]) {
    throw new Error(`Unknown file extention: '${config}'!`);
  }

  const parseFile = getParser(ext, fileData);
  if (ext === '.ini') {
    return normalize(parseFile);
  }
  return parseFile;
};

export default parsing;
