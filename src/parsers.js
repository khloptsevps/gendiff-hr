import yaml from 'js-yaml';
import ini from 'ini';
import { isObject, isBoolean, keys } from 'lodash';

const myIniParse = (fileData) => {
  const parseFile = ini.parse(fileData);

  const normalize = (config) => {
    const configKeys = keys(config);
    const result = configKeys.reduce((acc, key) => {
      if (isObject(config[key])) {
        return { ...acc, [key]: normalize(config[key]) };
      }
      if (isBoolean(config[key])) {
        return { ...acc, [key]: config[key] };
      }
      if (Number.isNaN(Number(config[key]))) {
        return { ...acc, [key]: config[key] };
      }
      return { ...acc, [key]: Number(config[key]) };
    }, {});
    return result;
  };

  return normalize(parseFile);
};

export const parse = (type, fileData) => {
  switch (type) {
    case '.json':
      return JSON.parse(fileData);
    case '.yaml':
      return yaml.safeLoad(fileData);
    case '.yml':
      return yaml.safeLoad(fileData);
    case '.ini':
      return myIniParse(fileData);
    default:
      throw new Error(`Unknown file type! ${type} is not supported!`);
  }
};

export default parse;
