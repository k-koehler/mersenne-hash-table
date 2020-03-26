const Map = require(".");
const { FNV1aHash64 } = require(".");

describe("FNV1aHash64", () => {
  it("should hash hello world properly", () => {
    expect(FNV1aHash64("hello")).toBe(11831194018420276491n);
  });
});

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

  describe("handles collisions properly", () => {
    it("should get the right value", () => {
      {
        const map = new Map();
        map
          .set("8yn0iYCKYHlIj4-BwPqk", "foo")
          .set("GReLUrM4wMqfg9yzV3KQ", "bar");
        expect(map._indexOfKey("8yn0iYCKYHlIj4-BwPqk")).toBe(
          map._indexOfKey("GReLUrM4wMqfg9yzV3KQ")
        );
        expect(map.get("8yn0iYCKYHlIj4-BwPqk")).toBe("foo");
        expect(map.get("GReLUrM4wMqfg9yzV3KQ")).toBe("bar");
      }
      {
        const map = new Map();
        map
          .set("GReLUrM4wMqfg9yzV3KQ", "bar")
          .set("8yn0iYCKYHlIj4-BwPqk", "foo");
        expect(map._indexOfKey("8yn0iYCKYHlIj4-BwPqk")).toBe(
          map._indexOfKey("GReLUrM4wMqfg9yzV3KQ")
        );
        expect(map.get("8yn0iYCKYHlIj4-BwPqk")).toBe("foo");
        expect(map.get("GReLUrM4wMqfg9yzV3KQ")).toBe("bar");
      }
    });

    it("should remove the right element", () => {
      {
        const map = new Map();
        map
          .set("8yn0iYCKYHlIj4-BwPqk", "foo")
          .set("GReLUrM4wMqfg9yzV3KQ", "bar");
        expect(map._indexOfKey("8yn0iYCKYHlIj4-BwPqk")).toBe(
          map._indexOfKey("GReLUrM4wMqfg9yzV3KQ")
        );
        map.remove("8yn0iYCKYHlIj4-BwPqk");
        expect(map.get("8yn0iYCKYHlIj4-BwPqk")).toBeUndefined();
        expect(map.get("GReLUrM4wMqfg9yzV3KQ")).toBe("bar");
      }
      {
        const map = new Map();
        map
          .set("8yn0iYCKYHlIj4-BwPqk", "foo")
          .set("GReLUrM4wMqfg9yzV3KQ", "bar");
        expect(map._indexOfKey("8yn0iYCKYHlIj4-BwPqk")).toBe(
          map._indexOfKey("GReLUrM4wMqfg9yzV3KQ")
        );
        map.remove("GReLUrM4wMqfg9yzV3KQ");
        expect(map.get("8yn0iYCKYHlIj4-BwPqk")).toBe("foo");
        expect(map.get("GReLUrM4wMqfg9yzV3KQ")).toBeUndefined();
      }
    });
  });
});
