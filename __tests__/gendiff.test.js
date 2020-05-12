import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const flatResult = fs.readFileSync(path.resolve(__dirname, './fixtures/flat/result.diff'), 'utf8');
const recurciveResult = fs.readFileSync(path.resolve(__dirname, './fixtures/recursive/result.diff'), 'utf8');
const plainResult = fs.readFileSync(path.resolve(__dirname, './fixtures/recursive/plain.diff'), 'utf8');
const jsonResult = fs.readFileSync(path.resolve(__dirname, './fixtures/recursive/json.diff'), 'utf8');

let beforeJSON = path.resolve(__dirname, './fixtures/flat/before.yml');
let afterJSON = path.resolve(__dirname, './fixtures/flat/after.yml');

let beforeYML = path.resolve(__dirname, './fixtures/flat/before.yml');
let afterYML = path.resolve(__dirname, './fixtures/flat/after.yml');

let beforeINI = path.resolve(__dirname, './fixtures/flat/before.yml');
let afterINI = path.resolve(__dirname, './fixtures/flat/after.yml');

afterEach(() => {
  beforeJSON = path.resolve(__dirname, './fixtures/recursive/before.json');
  afterJSON = path.resolve(__dirname, './fixtures/recursive/after.json');
  beforeYML = path.resolve(__dirname, './fixtures/recursive/before.json');
  afterYML = path.resolve(__dirname, './fixtures/recursive/after.json');
  beforeINI = path.resolve(__dirname, './fixtures/recursive/before.json');
  afterINI = path.resolve(__dirname, './fixtures/recursive/after.json');
});

test('flat', () => {
  expect(genDiff(beforeJSON, afterJSON)).toEqual(flatResult);
  expect(genDiff(beforeYML, afterYML)).toEqual(flatResult);
  expect(genDiff(beforeINI, afterINI)).toEqual(flatResult);
});

test('recursive', () => {
  expect(genDiff(beforeJSON, afterJSON)).toEqual(recurciveResult);
  expect(genDiff(beforeYML, afterYML)).toEqual(recurciveResult);
  expect(genDiff(beforeINI, afterINI)).toEqual(recurciveResult);
});

test('plain', () => {
  expect(genDiff(beforeJSON, afterJSON, 'plain')).toEqual(plainResult);
  expect(genDiff(beforeYML, afterYML, 'plain')).toEqual(plainResult);
  expect(genDiff(beforeINI, afterINI, 'plain')).toEqual(plainResult);
});

test('json', () => {
  expect(genDiff(beforeJSON, afterJSON, 'json')).toEqual(jsonResult);
  expect(genDiff(beforeYML, afterYML, 'json')).toEqual(jsonResult);
  expect(genDiff(beforeINI, afterINI, 'json')).toEqual(jsonResult);
});
