const { simpleHash32 } = require("./hash");

describe("hash", () => {
  describe("simpleHash32", () => {
    it("should hash a sample sentence", () => {
      expect(simpleHash32("the quick brown fox jumps over the lazy dog")).toBe(
        854341482
      );
    });
  });
});
