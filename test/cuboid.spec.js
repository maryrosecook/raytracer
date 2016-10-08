var expect = require("chai").expect;

var Cuboid = require("../src/cuboid");
var Vector = require("../src/vector");

describe("cuboid", function() {
  describe("creation", function() {
    it("should throw if missing no options passed", function() {
      expect(function() {
        new Cuboid();
      }).to.throw("Requires object");
    });

    it("should throw if missing center", function() {
      expect(function() {
        new Cuboid({});
      }).to.throw("Requires center option");
    });

    it("should throw if missing dimensions", function() {
      expect(function() {
        new Cuboid({ center: new Vector({ x: 1, y: 1, z: 1 }) });
      }).to.throw("Requires dimensions option");
    });

    it("should create sphere w center, dimensions", function() {
      var sphere = new Cuboid({
        center: new Vector({ x: 1, y: 2, z: 3 }),
        dimensions: new Vector({ x: 4, y: 5, z: 6 })
      });

      expect(sphere.center.x).to.equal(1);
      expect(sphere.center.y).to.equal(2);
      expect(sphere.center.z).to.equal(3);
      expect(sphere.dimensions.x).to.equal(4);
      expect(sphere.dimensions.y).to.equal(5);
      expect(sphere.dimensions.z).to.equal(6);
    });
  });

  describe("#copy", function() {
    it("should create copy with same data", function() {
      var cuboid = new Cuboid({
        center: new Vector({ x: 1, y: 2, z: 3 }),
        dimensions: new Vector({ x: 4, y: 5, z: 6 })
      });

      var cuboidCopy = cuboid.copy();
      expect(cuboidCopy.center.x).to.equal(cuboid.center.x);
      expect(cuboidCopy.center.y).to.equal(cuboid.center.y);
      expect(cuboidCopy.center.z).to.equal(cuboid.center.z);
      expect(cuboidCopy.dimensions.x).to
        .equal(cuboid.dimensions.x);
      expect(cuboidCopy.dimensions.y).to
        .equal(cuboid.dimensions.y);
      expect(cuboidCopy.dimensions.z).to
        .equal(cuboid.dimensions.z);
    });

    it("shouldn't change copy if orig changes", function() {
      var cuboid = new Cuboid({
        center: new Vector({ x: 1, y: 2, z: 3 }),
        dimensions: new Vector({ x: 4, y: 5, z: 6 })
      });

      var cuboidCopy = cuboid.copy();
      cuboid.center.x = 5;
      cuboid.dimensions.x = 6;
      expect(cuboidCopy.center.x).to.equal(1);
      expect(cuboidCopy.dimensions.x).to.equal(4);
    });
  });

  describe("#filterDimensions", function() {
    it("moves passed dimensions into x and y positions", function() {
      var cuboid = new Cuboid({
        center: new Vector({ x: 1, y: 2, z: 3 }),
        dimensions: new Vector({ x: 4, y: 5, z: 6 })
      }).filterDimensions(["y", "z"]);

      expect(cuboid.center).to.eql(new Vector({ x: 2, y: 3 }));
    });
  });
});
