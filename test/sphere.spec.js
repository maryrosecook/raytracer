var expect = require("chai").expect;

var Sphere = require("../src/sphere");
var Vector = require("../src/vector");

describe("sphere", function() {
  describe("creation", function() {
    it("should throw if missing no options passed", function() {
      expect(function() {
        new Sphere();
      }).to.throw("Requires object");
    });

    it("should throw if missing center", function() {
      expect(function() {
        new Sphere({});
      }).to.throw("Requires center option");
    });

    it("should throw if missing radius", function() {
      expect(function() {
        new Sphere({ center: new Vector({ x: 1, y: 1, z: 1 }) });
      }).to.throw("Requires radius option");
    });

    it("should create sphere with center and radius", function() {
      var sphere = new Sphere({
        center: new Vector({ x: 1, y: 2, z: 3 }),
        radius: 4
      });

      expect(sphere.center.x).to.equal(1);
      expect(sphere.center.y).to.equal(2);
      expect(sphere.center.z).to.equal(3);
      expect(sphere.radius).to.equal(4);
    });
  });

  describe("#copy", function() {
    it("should create copy with same data", function() {
      var sphere = new Sphere({
        center: new Vector({ x: 1, y: 2, z: 3 }),
        radius: 4
      });

      var sphereCopy = sphere.copy();
      expect(sphereCopy.center.x).to.equal(sphere.center.x);
      expect(sphereCopy.center.y).to.equal(sphere.center.y);
      expect(sphereCopy.center.z).to.equal(sphere.center.z);
      expect(sphereCopy.radius).to.equal(sphere.radius);
    });

    it("shouldn't change copy if orig changes", function() {
      var sphere = new Sphere({
        center: new Vector({ x: 1, y: 2, z: 3 }),
        radius: 4
      });

      var sphereCopy = sphere.copy();
      sphere.center.x = 5;
      sphere.radius = 6;
      expect(sphereCopy.center.x).to.equal(1);
      expect(sphereCopy.radius).to.equal(4);
    });
  });

  describe("#filterDimensions", function() {
    it("moves passed dimensions into x and y positions", function() {
      var sphere = new Sphere({
        center: new Vector({ x: 1, y: 2, z: 3 }),
        radius: 4
      }).filterDimensions(["y", "z"]);

      expect(sphere.center).to.eql(new Vector({ x: 2, y: 3 }));
    });
  });
});
