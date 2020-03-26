const Map = require(".");

describe("FastStringMap", () => {
  describe("get and set", () => {
    it("should get and set a string property", () => {
      const map = new Map();
      map.set("a", "b");
      expect(map.get("c")).toBeUndefined();
      expect(map.get("a")).toBe("b");
    });
  });

  describe("remove", () => {
    it("should remove the property", () => {
      const map = new Map().set("foo", "bar");
      expect(map.get("foo")).toBe("bar");
      map.remove("foo");
      expect(map.get("foo")).toBeUndefined();
    });
  });

  describe.skip("handles collisions properly", () => {
    // TODO: find a collision
    const collisionWordA = "some word",
      collisionWordB = "some other word";

    it("should get the right value", () => {
      hash.simpleHash32 = () => null;
      {
        const map = new Map();
        map.set(collisionWordA, "foo").set(collisionWordB, "bar");
        expect(map._indexOfKey(collisionWordA)).toBe(
          map._indexOfKey(collisionWordB)
        );
        expect(map.get(collisionWordA)).toBe("foo");
        expect(map.get(collisionWordB)).toBe("bar");
      }
      {
        const map = new Map();
        map.set(collisionWordB, "bar").set(collisionWordA, "foo");
        expect(map._indexOfKey(collisionWordA)).toBe(
          map._indexOfKey(collisionWordB)
        );
        expect(map.get(collisionWordA)).toBe("foo");
        expect(map.get(collisionWordB)).toBe("bar");
      }
    });

    it("should remove the right element", () => {
      {
        const map = new Map();
        map.set(collisionWordA, "foo").set(collisionWordB, "bar");
        expect(map._indexOfKey(collisionWordA)).toBe(
          map._indexOfKey(collisionWordB)
        );
        map.remove(collisionWordA);
        expect(map.get(collisionWordA)).toBeUndefined();
        expect(map.get(collisionWordB)).toBe("bar");
      }
      {
        const map = new Map();
        map.set(collisionWordA, "foo").set(collisionWordB, "bar");
        expect(map._indexOfKey(collisionWordA)).toBe(
          map._indexOfKey(collisionWordB)
        );
        map.remove(collisionWordB);
        expect(map.get(collisionWordA)).toBe("foo");
        expect(map.get(collisionWordB)).toBeUndefined();
      }
    });
  });
});
