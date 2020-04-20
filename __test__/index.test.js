// @ts-check
import path from 'path';
import genDiff from '../src/index.js';
// import { parsing } from '../src/parsers.js';


const diff = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

const recursiveDiff = `{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

// flat JSON
const firstJson = path.resolve(__dirname, './fixtures/before.json');
const secondJson = path.resolve(__dirname, './fixtures/after.json');

// recursive JSON
const firstPathToJson = path.resolve(__dirname, './fixtures/before2.json');
const secondPathToJson = path.resolve(__dirname, './fixtures/after2.json');

// flat YML
const firstYml = path.resolve(__dirname, './fixtures/before.yml');
const secondYml = path.resolve(__dirname, './fixtures/after.yml');

// recursive YML
const firstYmlRec = path.resolve(__dirname, './fixtures/before2.yml');
const secondYmlRec = path.resolve(__dirname, './fixtures/after2.yml');

// flat INI
const firstIni = path.resolve(__dirname, './fixtures/before.ini');
const secondIni = path.resolve(__dirname, './fixtures/after.ini');

// recursive Ini
const firstIniRec = path.resolve(__dirname, './fixtures/before2.ini');
const secondIniRec = path.resolve(__dirname, './fixtures/after2.ini');

test('flatJson', () => {
  expect(genDiff(firstJson, secondJson)).toEqual(diff);
});

test('recursiveJson', () => {
  expect(genDiff(firstPathToJson, secondPathToJson)).toEqual(recursiveDiff);
});

test('flatYml', () => {
  expect(genDiff(firstYml, secondYml)).toEqual(diff);
});

test('recursiveYml', () => {
  expect(genDiff(firstYmlRec, secondYmlRec)).toEqual(recursiveDiff);
});

test('flatINI', () => {
  expect(genDiff(firstIni, secondIni)).toEqual(diff);
});

test('recursiveINI', () => {
  expect(genDiff(firstIniRec, secondIniRec)).toEqual(recursiveDiff);
});
