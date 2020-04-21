// @ts-check
import path from 'path';
import genDiff from '../src/index.js';

const recursiveDiff = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
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
  + verbose: true
  + group3: {
        fee: 100500
    }
}`;

const plainDiff = `Property 'timeout' was changed from 50 to 20
Property 'proxy' was deleted
Property 'follow' was deleted
Property 'common.setting2' was deleted
Property 'common.setting3' was changed from true to [complex value]
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.follow' was added with value: false
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was changed from 'bas' to 'bars'
Property 'group1.nest' was changed from [complex value] to 'str'
Property 'group2' was deleted
Property 'verbose' was added with value: true
Property 'group3' was added with value: [complex value]`;

// recursive JSON
const firstPathToJson = path.resolve(__dirname, './fixtures/before.json');
const secondPathToJson = path.resolve(__dirname, './fixtures/after.json');

// recursive YML
const firstYmlRec = path.resolve(__dirname, './fixtures/before.yml');
const secondYmlRec = path.resolve(__dirname, './fixtures/after.yml');

// recursive Ini
const firstIniRec = path.resolve(__dirname, './fixtures/before.ini');
const secondIniRec = path.resolve(__dirname, './fixtures/after.ini');

test('flat and recursive JSON', () => {
  expect(genDiff(firstPathToJson, secondPathToJson)).toEqual(recursiveDiff);
});

test('flat and recursive YML', () => {
  expect(genDiff(firstYmlRec, secondYmlRec)).toEqual(recursiveDiff);
});

test('flat and recursive INI', () => {
  expect(genDiff(firstIniRec, secondIniRec)).toEqual(recursiveDiff);
});

test('plain JSON', () => {
  expect(genDiff(firstPathToJson, secondPathToJson, 'plain')).toEqual(plainDiff);
});

test('plain YML', () => {
  expect(genDiff(firstYmlRec, secondYmlRec, 'plain')).toEqual(plainDiff);
});

test('plain INI', () => {
  expect(genDiff(firstIniRec, secondIniRec, 'plain')).toEqual(plainDiff);
});
