const { mersennePrime } = require("./mersenne");

describe("mersenne", () => {
  describe("mersennePrime", () => {
    it("should yield the right numbers", () => {
      const g = mersennePrime();
      expect(g.next().value).toBe(127);
      expect(g.next().value).toBe(8191);
      expect(g.next().value).toBe(131071);
      expect(g.next().value).toBe(524287);
      expect(g.next().value).toBe(2147483647);
    });
  });
});
