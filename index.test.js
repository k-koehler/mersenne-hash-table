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

  describe("grow", () => {
    it("should grow", () => {
      const map = new Map();
      for (let i = 0; i < 126; ++i) {
        map.set(`${i}`, i);
        expect(map.size).toBe(i + 1);
      }
      expect(map._capacity).toBe(127);
      expect(map.size).toBe(126);
      map.set("foo", "bar");
      expect(map._capacity).toBe(8191);
      expect(map.get("foo")).toBe("bar");
      for (let i = 0; i < 126; ++i) {
        expect(map.get(`${i}`, i)).toBe(i);
      }
    });
  });

  describe("entries", () => {
    it("shoud return empty arr, map is empty", () => {
      const map = new Map();
      expect(map.entries()).toEqual([]);
    });

    it("shoud return a few k,v pairs", () => {
      const map = new Map().set("foo", "bar").set("bar", "baz");
      const enties = map.entries();
      expect(enties).toHaveLength(2);
      let correct = 0;
      for (const [key, value] of enties) {
        if (key === "foo") {
          ++correct;
          expect(value).toBe("bar");
        }
        if (key === "bar") {
          ++correct;
          expect(value).toBe("baz");
        }
      }
      expect(correct).toBe(2);
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
