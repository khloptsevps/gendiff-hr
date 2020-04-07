import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const getConfigPath = (pathToConfig) => fs.readFileSync(path.resolve(pathToConfig), 'utf-8');

export const parsing = (config) => {
  switch (path.extname(config)) {
    case '.json':
      return JSON.parse(getConfigPath(config));
    case '.yml':
      return yaml.safeLoad(getConfigPath(config));
    case '.ini':
      return ini.parse(getConfigPath(config));
    default:
      throw new Error('Unknown file extention');
  }
};

export default parsing;
