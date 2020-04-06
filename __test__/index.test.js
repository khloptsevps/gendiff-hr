// @ts-check
import path from 'path';
import genDiff from '../src/index.js';

const firstPath = path.resolve(__dirname, './fixtures/before.json');
const secondPath = path.resolve(__dirname, './fixtures/after.json');

test('FilePaths', () => {
  expect(firstPath).toEqual('/Users/khloptsev/JS/project/gendiff-hr/__test__/fixtures/before.json');
  expect(secondPath).toEqual('/Users/khloptsev/JS/project/gendiff-hr/__test__/fixtures/after.json');
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
  expect(genDiff(firstPath, secondPath)).toEqual(diff);
});
