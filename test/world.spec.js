var expect = require("chai").expect;

var World = require("../src/world");

describe("world", function() {
  describe("creation", function() {
    it("should be able to be instantiated", function() {
      expect(new World()).to.be.instanceof(World);
    });
  });
});
