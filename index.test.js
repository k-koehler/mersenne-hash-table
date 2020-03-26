const Map = require(".");
const { FNV1aHash64 } = require(".");

describe("FNV1aHash128", () => {
  it("should hash hello world properly", () => {
    expect(FNV1aHash64("hello")).toBe(11831194018420276491n);
  });
});

describe("Map", () => {
  describe("get and set", () => {
    it("should get and set a string property", () => {
      const map = new Map();
      map.set("a", "b");
      expect(map.get("c")).toBeUndefined();
      expect(map.get("a")).toBe("b");
    });
  });
});
