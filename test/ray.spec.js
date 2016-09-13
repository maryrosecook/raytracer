var expect = require("chai").expect;

var Ray = require("../src/ray").Ray;
var Sphere = require("../src/sphere").Sphere;

describe("ray", function() {
  describe("creation", function() {
    it("should throw if missing no options passed", function() {
      expect(function() {
        new Ray();
      }).to.throw("Requires object");
    });

    it("should throw if missing origin", function() {
      expect(function() {
        new Ray({ });
      }).to.throw("Requires origin option");
    });

    it("should throw if missing direction", function() {
      expect(function() {
        new Ray({ origin: {} });
      }).to.throw("Requires direction option");
    });

    it("should throw if origin missing x", function() {
      expect(function() {
        new Ray({ origin: {}, direction: {} });
      }).to.throw("Requires x option");
    });

    it("should throw if origin missing y", function() {
      expect(function() {
        new Ray({ origin: { x: 1 }, direction: {} });
      }).to.throw("Requires y option");
    });

    it("should throw if origin missing z", function() {
      expect(function() {
        new Ray({ origin: { x: 1, y: 2 }, direction: {} });
      }).to.throw("Requires z option");
    });

    it("should throw if direction missing x", function() {
      expect(function() {
        new Ray({
          origin: { x: 1, y: 2, z: 3 },
          direction: {}
        });
      }).to.throw("Requires x option");
    });

    it("should throw if direction missing y", function() {
      expect(function() {
        new Ray({
          origin: { x: 1, y: 2, z: 3 },
          direction: { x: 1 }
        });
      }).to.throw("Requires y option");
    });

    it("should throw if direction missing z", function() {
      expect(function() {
        new Ray({
          origin: { x: 1, y: 2, z: 3 },
          direction: { x: 1, y: 2 }
        });
      }).to.throw("Requires z option");
    });

    it("should create ray with origin and direction", function() {
      var ray = new Ray({
        origin: { x: 1, y: 2, z: 3 },
        direction: { x: 4, y: 5, z: 6 }
      });

      expect(ray.origin.x).to.equal(1);
      expect(ray.origin.y).to.equal(2);
      expect(ray.origin.z).to.equal(3);
      expect(ray.direction.x).to.equal(4);
      expect(ray.direction.y).to.equal(5);
      expect(ray.direction.z).to.equal(6);
    });
  });

  describe("#isIntersecting", function() {
    it("should return true for ray through sphere", function() {
      var ray = new Ray({
        origin: { x: 50, y: 200, z: 200 },
        direction: {
          x: 0.9284766908852593,
          y: -0.3713906763541037,
          z: 0
        }
      });

      var sphere = new Sphere({
        x: 200,
        y: 200,
        z: 200,
        radius: 100
      });

      expect(ray.isIntersecting(sphere)).to.equal(true);
    });
  });
});
