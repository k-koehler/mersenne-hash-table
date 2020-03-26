function simpleHash32(str) {
  let hash = 0x1505,
    i = str.length;
  while (i) hash = (hash * 0x21) ^ str.charCodeAt(--i);
  return hash >>> 0;
}

module.exports = {
  simpleHash32
};
