"use-strict";

const HASH_SIZE = 64,
  FNV_PRIME_64 = 1099511628211n,
  FNV_OFFSET_64 = 14695981039346656037n;

let char;
function FNV1aHash64(string) {
  const { length } = string;
  let hash = FNV_OFFSET_64,
    i = 0;
  for (
    ;
    i < length;
    char = BigInt(string.charCodeAt(i++)),
      hash = BigInt.asUintN(HASH_SIZE, (hash ^ char) * FNV_PRIME_64)
  );
  return hash;
}

const DEFAULT_TABLE_SIZE_L_SHIFT = 9;

function fastRemoveElem(arr, i) {
  const tmp = arr[arr.length - 1];
  arr[arr.length - 1] = arr[i];
  arr[i] = tmp;
  arr.pop();
}

// TODO: use mersenne primes for table size
// TODO: handle grow
// TODO: values method
class FastStringMap {
  constructor() {
    this._size_factor = DEFAULT_TABLE_SIZE_L_SHIFT;
    const capacity = 0x2 << this._size_factor;
    this._capacity = BigInt(capacity);
    this._table = new Array(capacity);
    this.size = 0;
  }

  _indexOfKey(key) {
    return FNV1aHash64(key) & (this._capacity - 1n);
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
}

module.exports = FastStringMap;
module.exports.FNV1aHash64 = FNV1aHash64;
