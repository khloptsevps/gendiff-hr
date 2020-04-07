// @ts-check
import path from 'path';
import genDiff from '../src/index.js';

const diff = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

const firstPathToJson = path.resolve(__dirname, './fixtures/before.json');
const secondPathToJson = path.resolve(__dirname, './fixtures/after.json');

const firstPathtoYml = path.resolve(__dirname, './fixtures/before.yml');
const secondPathtoYml = path.resolve(__dirname, './fixtures/after.yml');

const firstPathtoIni = path.resolve(__dirname, './fixtures/before.ini');
const secondPathtoIni = path.resolve(__dirname, './fixtures/after.ini');

test('plainDiffTwoJsonFiles', () => {
  expect(genDiff(firstPathToJson, secondPathToJson)).toEqual(diff);
});

test('plainDiffTwoYmlFiles', () => {
  expect(genDiff(firstPathtoYml, secondPathtoYml)).toEqual(diff);
});

test('plainDiffTwoIniFiles', () => {
  expect(genDiff(firstPathtoIni, secondPathtoIni)).toEqual(diff);
});
