import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import { isObject, isNaN } from 'lodash';

const getConfigPath = (pathToConfig) => fs.readFileSync(path.resolve(pathToConfig), 'utf-8');

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


export const parsing = (config) => {
  switch (path.extname(config)) {
    case '.json':
      return JSON.parse(getConfigPath(config));
    case '.yml':
      return yaml.safeLoad(getConfigPath(config));
    case '.ini':
      return normalize(ini.parse(getConfigPath(config)));
    default:
      throw new Error(`Unknown file extention: '${config}'!`);
  }
};

export default parsing;
