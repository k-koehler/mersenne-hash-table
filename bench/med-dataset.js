const FastStringMap = require("mersenne-hash-table");
const { now } = require("microtime");
const assert = require("assert");

const DATA_SIZE = 10000;

const map = new Map(),
  fastStringMap = new FastStringMap(),
  obj = {};
function setGetFastStringMap() {
  for (let i = 0; i < DATA_SIZE; ++i) {
    fastStringMap.set(`${i}`, i);
  }
  let result = 0;
  for (let i = 0; i < DATA_SIZE; ++i) {
    result += fastStringMap.get(`${i}`);
  }
  return result;
}

function setGetMap() {
  for (let i = 0; i < DATA_SIZE; ++i) {
    map.set(`${i}`, i);
  }
  let result = 0;
  for (let i = 0; i < DATA_SIZE; ++i) {
    result += map.get(`${i}`);
  }
  return result;
}

function setGetObject() {
  for (let i = 0; i < DATA_SIZE; ++i) {
    obj[i] = i;
  }
  let result = 0;
  for (let i = 0; i < DATA_SIZE; ++i) {
    result += obj[i];
  }
  return result;
}

let t1, t2, t3;
t1 = t2 = t3 = 0;
for (let i = 0; i < 10; ++i) {
  {
    const start = now();
    assert.equal(setGetMap(), 49995000);
    const end = now();
    t1 += end - start;
  }
  {
    const start = now();
    assert.equal(setGetObject(), 49995000);
    const end = now();
    t2 += end - start;
  }
  {
    const start = now();
    assert.equal(setGetFastStringMap(), 49995000);
    const end = now();
    t3 += end - start;
  }
}

console.log("Total time in microseconds (less is better):");
console.log("Map", t1);
console.log("Object", t2);
console.log("FastStringMap", t3);
