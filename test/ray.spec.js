var expect = require("chai").expect;

var Ray = require("../src/ray");
var Sphere = require("../src/sphere");
var Vector = require("../src/vector");

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
        new Ray({ origin: new Vector({ x: 1, y: 2, z: 3 }) });
      }).to.throw("Requires direction option");
    });

    it("should create ray with origin and direction", function() {
      var ray = new Ray({
        origin: new Vector({ x: 1, y: 2, z: 3 }),
        direction: new Vector({ x: 4, y: 5, z: 6 })
      });

      expect(ray.origin.x).to.equal(1);
      expect(ray.origin.y).to.equal(2);
      expect(ray.origin.z).to.equal(3);
      expect(ray.direction.x).to.equal(4);
      expect(ray.direction.y).to.equal(5);
      expect(ray.direction.z).to.equal(6);
    });
  });
});
