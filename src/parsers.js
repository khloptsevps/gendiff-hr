import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const getConfigPath = (pathToConfig) => fs.readFileSync(path.resolve(pathToConfig));

export const parsing = (config) => {
  switch (path.extname(config)) {
    case '.json':
      return JSON.parse(getConfigPath(config));
    case '.yml':
      return yaml.safeLoad(getConfigPath(config));
    default:
      throw new Error('Unknown file extention');
  }
};

export default parsing;
