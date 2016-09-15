var expect = require("chai").expect;

var Vector = require("../src/vector");

describe("vector", function() {
  describe("creation", function() {
    it("should throw if missing x coordinate", function() {
      expect(function() {
        new Vector({ });
      }).to.throw("Should be a number");
    });

    it("should throw if missing y coordinate", function() {
      expect(function() {
        new Vector({ x: 1 });
      }).to.throw("Should be a number");
    });

    it("should throw if missing z coordinate", function() {
      expect(function() {
        new Vector({ x: 1, y: 2 });
      }).to.throw("Should be a number");
    });

    it("should create vector with x, y, z attributes", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      expect(vector.x).to.equal(1);
      expect(vector.y).to.equal(2);
      expect(vector.z).to.equal(3);
    });
  });

  describe("#checkIsValid", function() {
    it("should throw if x invalid", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      vector.x = "";
      expect(function() {
        vector.checkIsValid();
      }).to.throw("Should be a number")
    });

    it("should throw if y invalid", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      vector.y = "";
      expect(function() {
        vector.checkIsValid();
      }).to.throw("Should be a number")
    });

    it("should throw if z invalid", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      vector.z = "";
      expect(function() {
        vector.checkIsValid();
      }).to.throw("Should be a number")
    });
  });

  describe("#copy", function() {
    it("should throw if vector invalid", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      vector.x = "";
      expect(function() {
        vector.copy();
      }).to.throw("Should be a number")
    });

    it("should multiply vector by passed scalar", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      var vectorCopy = vector.copy();
      expect(vectorCopy.x).to.equal(vector.x);
      expect(vectorCopy.y).to.equal(vector.y);
      expect(vectorCopy.z).to.equal(vector.z);
    });
  });

  describe("#multiplyByScalar", function() {
    it("should throw if this vector invalid", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      vector.x = "";
      expect(function() {
        vector.multiplyByScalar(10);
      }).to.throw("Should be a number")
    });

    it("should throw if scalar not number", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      expect(function() {
        vector.multiplyByScalar();
      }).to.throw("Should be a number")
    });

    it("should multiply vector by passed scalar", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      var newVector = vector.multiplyByScalar(3);
      expect(newVector.x).to.equal(3);
      expect(newVector.y).to.equal(6);
      expect(newVector.z).to.equal(9);
    });
  });

  describe("#add", function() {
    it("should throw if this vector invalid", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      vector.x = "";
      expect(function() {
        vector.add();
      }).to.throw("Should be a number")
    });

    it("should throw if passed vector invalid", function() {
      var vector1 = new Vector({ x: 1, y: 2, z: 3 });
      var vector2 = new Vector({ x: 4, y: 5, z: 6 });
      vector2.x = "";
      expect(function() {
        vector1.add(vector2);
      }).to.throw("Should be a number")
    });

    it("should add passed vector", function() {
      var vector1 = new Vector({ x: 1, y: 2, z: 3 });
      var vector2 = new Vector({ x: 4, y: 5, z: 6 });
      var newVector = vector1.add(vector2);
      expect(newVector.x).to.equal(5);
      expect(newVector.y).to.equal(7);
      expect(newVector.z).to.equal(9);
    });
  });

  describe("#subtract", function() {
    it("should throw if this vector invalid", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      vector.x = "";
      expect(function() {
        vector.subtract();
      }).to.throw("Should be a number")
    });

    it("should throw if passed vector invalid", function() {
      var vector1 = new Vector({ x: 1, y: 2, z: 3 });
      var vector2 = new Vector({ x: 4, y: 5, z: 6 });
      vector2.x = "";
      expect(function() {
        vector1.subtract(vector2);
      }).to.throw("Should be a number")
    });

    it("should subtract passed vector", function() {
      var vector1 = new Vector({ x: 1, y: 2, z: 3 });
      var vector2 = new Vector({ x: 4, y: 5, z: 6 });
      var newVector = vector1.subtract(vector2);
      expect(newVector.x).to.equal(-3);
      expect(newVector.y).to.equal(-3);
      expect(newVector.z).to.equal(-3);
    });
  });

  describe("#magnitude", function() {
    it("should throw if this vector invalid", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      vector.x = "";
      expect(function() {
        vector.magnitude();
      }).to.throw("Should be a number")
    });

    it("should return magnitude", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      expect(vector.magnitude()).to.equal(3.7416573867739413);
    });
  });

  describe("#normalize", function() {
    it("should throw if this vector invalid", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      vector.x = "";
      expect(function() {
        vector.normalize();
      }).to.throw("Should be a number")
    });

    it("should normalize vector", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      var newVector = vector.normalize();
      expect(vector.x).to.equal(0.2672612419124244);
      expect(vector.y).to.equal(0.5345224838248488);
      expect(vector.z).to.equal(0.8017837257372732);
    });
  });

  describe("#dotProduct", function() {
    it("should throw if this vector invalid", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      vector.x = "";
      expect(function() {
        vector.dotProduct();
      }).to.throw("Should be a number")
    });

    it("should throw if passed vector invalid", function() {
      var vector1 = new Vector({ x: 1, y: 2, z: 3 });
      var vector2 = new Vector({ x: 4, y: 5, z: 6 });
      vector2.x = "";
      expect(function() {
        vector1.dotProduct(vector2);
      }).to.throw("Should be a number")
    });

    it("should subtract passed vector", function() {
      var vector1 = new Vector({ x: 1, y: 2, z: 3 });
      var vector2 = new Vector({ x: 4, y: 5, z: 6 });
      expect(vector1.dotProduct(vector2)).to.equal(32);
    });
  });
});
