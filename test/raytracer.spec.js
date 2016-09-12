var expect = require("chai").expect;

var Raytracer = require("../src/raytracer").Raytracer;

describe("raytracer", function() {
  it("should be able to be instantiated", function() {
    expect(new Raytracer()).to.be.instanceof(Raytracer);
  });
});
