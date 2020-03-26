const HASH_SIZE = 64,
  FNV_PRIME_64 = 1099511628211n,
  FNV_OFFSET_64 = 14695981039346656037n;

function FNV1aHash64(string) {
  const { length } = string;
  let char,
    hash = FNV_OFFSET_64,
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

class FastStringMap {
  constructor() {
    this._size_factor = DEFAULT_TABLE_SIZE_L_SHIFT;
    this._capacity = BigInt(0x2 << this._size_factor);
    this._table = new Array(this._capacity);
    this.size = 0;
  }

  _indexOfKey(key) {
    return FNV1aHash64(key) & (this._capacity - 1n);
  }

  /**
   * @param key the key to get
   * @returns the value stored in the key, or undefined if it doesnt exist
   */
  get(key) {
    return this._table[this._indexOfKey(key)];
  }

  /**
   * @param key the unique key by which to store your value
   * @param value the value to store
   * @returns this
   */
  set(key, value) {
    this._table[this._indexOfKey(key)] = value;
    ++this.size;
    return this;
  }
}

module.exports = FastStringMap;
module.exports.FNV1aHash64 = FNV1aHash64;
