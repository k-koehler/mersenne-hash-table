# mersenne-hash-table

## How it works

This hashtable uses a particular property of the mersenne primes to reduce a typically large modulo (`%`) instruction to a blazing fast bitwise and (`&`) operation. Consider the typical use cases for a hash-table, when you have a bucket of size `k` and a hash function `f` s.t. `f(x) > k`: to determine the index `i` to place your data, likely you're doing something like `i = f(x) % k`. However, there exists a property of mersenne primes (primes which take the form `2^s - 1` for some natural number `s`) which can summarized as: for a mesenne prime `m`, while `m` is larger than `k`, `k % m = k & m`.

See the above (very small) sample set:

| `k`   | `m`   | `k % m` | `k & m` |
|-----|-----|-------|-------|
| 1   | 127 |   1   | 1     |
| 50  | 127 |   50  | 50    |
| 100 | 127 |   100 | 100   |

To see how this works, consider the form that mersenne primes take:

| `m` | `m` binary representation | `k` | `k` binary representation | `k & m` |
|-----|---------------------------|-----|---------------------------|---------|
| 7   | 111                       | 3   | 011                       | 011     |
| 15  | 1111                      | 5   | 0101                      | 0101    |
| 31  | 11111                     | 17  | 10001                     | 10001   |

Since a mersenne prime `m_s` is represented in binary as `s` repeating 1 bits, the result of any bitwise `&` between `k_i` and `m_i` is simply `k_i` since `k_i & 1 = k_i`.
