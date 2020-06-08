import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const extention = ['json', 'yml', 'ini'];

describe('gendiff', () => {
  const recurciveResult = fs.readFileSync(path.resolve(__dirname, './fixtures/result.diff'), 'utf8');
  const plainResult = fs.readFileSync(path.resolve(__dirname, './fixtures/plain.diff'), 'utf8');
  const jsonResult = fs.readFileSync(path.resolve(__dirname, './fixtures/json.diff'), 'utf8');

  describe.each(extention)('compare two %s files', (ext) => {
    const before = path.resolve(__dirname, `./fixtures/before.${ext}`);
    const after = path.resolve(__dirname, `./fixtures/after.${ext}`);
    const expected = genDiff(before, after);

    test('stylish', () => {
      expect(expected).toEqual(recurciveResult);
    });

    test('plain', () => {
      expect(genDiff(before, after, 'plain')).toEqual(plainResult);
    });

    test('tree', () => {
      expect(genDiff(before, after, 'json')).toEqual(jsonResult);
    });
  });
});
