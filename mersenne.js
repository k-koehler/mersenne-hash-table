const _32BitPrimes = [3, 7, 31, 127, 8191, 131071, 524287, 2147483647];

function* mersennePrime(start = 4) {
  do {
    yield _32BitPrimes[start++ - 1];
  } while (start <= _32BitPrimes.length);
  throw new Error("out of 32 bit primes");
}

module.exports = {
  mersennePrime
};
