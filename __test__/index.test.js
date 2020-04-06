// @ts-check
import path from 'path';
import genDiff from '../src/index.js';

const firstPathToJson = path.resolve(__dirname, '../__fixtures__/before.json');
const secondPathToJson = path.resolve(__dirname, '../__fixtures__/after.json');

const firstPathtoYml = path.resolve(__dirname, '../__fixtures__/before.yml');
const secondPathtoYml = path.resolve(__dirname, '../__fixtures__/after.yml');

test('FilePathsToJson', () => {
  expect(firstPathToJson).toEqual('/Users/khloptsev/JS/project/gendiff-hr/__fixtures__/before.json');
  expect(secondPathToJson).toEqual('/Users/khloptsev/JS/project/gendiff-hr/__fixtures__/after.json');
});

test('FilePathsToYml', () => {
  expect(firstPathtoYml).toEqual('/Users/khloptsev/JS/project/gendiff-hr/__fixtures__/before.yml');
  expect(secondPathtoYml).toEqual('/Users/khloptsev/JS/project/gendiff-hr/__fixtures__/after.yml');
});

test('plainDiffTwoJsonFiles', () => {
  const diff = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  expect(genDiff(firstPathToJson, secondPathToJson)).toEqual(diff);
});

test('plainDiffTwoYmlFiles', () => {
  const diff = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  expect(genDiff(firstPathtoYml, secondPathtoYml)).toEqual(diff);
});
