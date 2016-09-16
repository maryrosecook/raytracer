var expect = require("chai").expect;

var Ray = require("../src/ray");
var Sphere = require("../src/sphere");
var Vector = require("../src/vector");
var RaySphereIntersection = require("../src/ray-sphere-intersection");

describe("RaySphereIntersection", function() {
  describe("creation", function() {
    it("should throw if missing no options passed", function() {
      expect(function() {
        new RaySphereIntersection();
      }).to.throw("Requires object");
    });

    it("should throw if missing origin", function() {
      expect(function() {
        new RaySphereIntersection({});
      }).to.throw("Requires ray option");
    });

    it("should throw if missing origin", function() {
      expect(function() {
        new RaySphereIntersection({ ray: {} });
      }).to.throw("Requires sphere option");
    });

    it("should create ray with origin and direction", function() {
      var ray = new Ray({
        origin: new Vector({ x: 1, y: 2, z: 3 }),
        direction: new Vector({ x: 4, y: 5, z: 6 })
      });

      var sphere = new Sphere({
        center: new Vector({
          x: 200,
          y: 200,
          z: 200,
        }),
        radius: 100
      });

      var raySphereIntersection =
          new RaySphereIntersection({ ray: ray, sphere: sphere });

      expect(raySphereIntersection.ray).to.eql(ray);
      expect(raySphereIntersection.sphere).to.eql(sphere);
    });
  });

  describe("#isIntersecting", function() {
    it("should return true for ray through sphere", function() {
      var ray = new Ray({
        origin: new Vector({ x: 50, y: 200, z: 200 }),
        direction: new Vector({
          x: 0.9284766908852593,
          y: -0.3713906763541037,
          z: 0
        })
      });

      var sphere = new Sphere({
        center: new Vector({
          x: 200,
          y: 200,
          z: 200,
        }),
        radius: 100
      });

      var raySphereIntersection =
          new RaySphereIntersection({ ray: ray, sphere: sphere });
      expect(raySphereIntersection.exists()).to.equal(true);
    });

    it("returns false if ray points away from sphere", function() {
      var ray = new Ray({
        origin: new Vector({ x: 50, y: 200, z: 200 }),
        direction: new Vector({
          x: -0.9063077870366497,
          y: 0.42261826174069994,
          z: 0
        })
      });

      var sphere = new Sphere({
        center: new Vector({
          x: 200,
          y: 200,
          z: 200,
        }),
        radius: 100
      });

      var raySphereIntersection =
          new RaySphereIntersection({ ray: ray, sphere: sphere });
      expect(raySphereIntersection.exists()).to.equal(false);

    });
  });

  describe("#intersectionPoint", function() {
    it("should return first ray intersection", function() {
      var ray = new Ray({
        origin: new Vector({ x: 50, y: 200, z: 200 }),
        direction: new Vector({
          x: 0.9284766908852593,
          y: -0.3713906763541037,
          z: 0
        })
      });

      var sphere = new Sphere({
        center: new Vector({
          x: 200,
          y: 200,
          z: 200
        }),

        radius: 100
      });

      var raySphereIntersection =
          new RaySphereIntersection({ ray: ray, sphere: sphere });

      expect(raySphereIntersection.point())
        .to.eql(new Vector({
          x: 102.20455250000724,
          y: 179.1181789999971,
          z: 200
        }));
    });
  });
});
