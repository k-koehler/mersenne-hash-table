const Map = require(".");

describe("Map", () => {
  describe("get and set", () => {
    it("should get and set a string property", () => {
      const map = new Map();
      map.set("a", "b");
      expect(map.get("c")).toBeNull();
      expect(map.get("a")).toBe("b");
    });
  });
});
