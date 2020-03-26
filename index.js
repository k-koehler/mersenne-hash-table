"use-strict";
const { simpleHash32 } = require("./hash");
const { mersennePrime } = require("./mersenne");

function fastRemoveElem(arr, i) {
  const tmp = arr[arr.length - 1];
  arr[arr.length - 1] = arr[i];
  arr[i] = tmp;
  arr.pop();
}

class FastStringMap {
  constructor() {
    this._mersenneIndex = 4;
    this._mersenneGenerator = mersennePrime();
    this._capacity = this._mersenneGenerator.next().value;
    this._table = new Array(this._capacity);
    this.size = 0;
  }

  _incrementMersenne() {
    ++this._mersenneIndex;
    this._capacity = this._mersenneGenerator.next().value;
  }

  _indexOfKey(key) {
    return simpleHash32(key) & this._capacity;
  }

  _grow() {
    this._incrementMersenne();
    const table = this._table,
      { length } = this._table;
    this._table = new Array(this._capacity);
    this._size = 0;
    let i = 0;
    for (; i < length; ++i) {
      let bucket;
      if ((bucket = table[i])) {
        let j = 0,
          { length: bucketLength } = bucket;
        for (; j < bucketLength; ++j) {
          this.set(bucket[j][0], bucket[j][1]);
        }
      }
    }
  }

  /**
   * @param key unique key
   * @returns the value stored in the key, or undefined if it doesnt exist
   */
  get(key) {
    const bucket = this._table[this._indexOfKey(key)];
    if (!bucket) {
      return undefined;
    }
    let { length } = bucket,
      i = 0;
    for (; i < length; ++i) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    return undefined;
  }

  /**
   * @param key unique key
   * @param value the value to store
   * @returns this
   */
  set(key, value) {
    let bucket,
      table = this._table,
      index = this._indexOfKey(key);
    if ((bucket = table[index]) !== undefined) {
      bucket.push([key, value]);
    } else {
      table[index] = [[key, value]];
    }
    ++this.size;
    if (this.size === this._capacity) {
      this._grow();
    }
    return this;
  }

  /**
   * @param key unique key
   * @returns this
   */
  remove(key) {
    const bucket = this._table[this._indexOfKey(key)];
    if (!bucket) {
      return this;
    }
    let { length } = bucket,
      i = 0;
    for (; i < length; ++i) {
      if (bucket[i][0] === key) {
        fastRemoveElem(bucket, i);
        return this;
      }
    }
    return this;
  }

  /**
   * retreive the entries in the map
   * @returns array of [key, value] pairs
   */
  entries() {
    const table = this._table,
      values = new Array(this.size).fill([]);
    let { length } = table,
      i = 0,
      cur = 0;
    for (; i < length; ++i) {
      if (table[i] !== undefined) {
        let { length: bucketLength } = table[i],
          j = 0;
        for (; j < bucketLength; ++j) {
          let valueIdx = cur++;
          values[valueIdx].push(table[i][j][0]);
          values[valueIdx].push(table[i][j][1]);
        }
      }
    }
    return values;
  }
}

module.exports = FastStringMap;
