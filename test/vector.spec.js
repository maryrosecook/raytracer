var expect = require("chai").expect;

var Vector = require("../src/vector");

describe("vector", function() {
  describe("creation", function() {
    it("should create vector with x, y attr and and no z", function() {
      var vector = new Vector({ x: 1, y: 2 });
      expect(vector.x).to.equal(1);
      expect(vector.y).to.equal(2);
      expect(vector.z).to.be.undefined;
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

    it("should allow no z", function() {
      var vector = new Vector({ x: 1, y: 2 });
      vector.checkIsValid();
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

    it("should create copy of vector with same dimensions", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      var vectorCopy = vector.copy();
      expect(vectorCopy.x).to.equal(vector.x);
      expect(vectorCopy.y).to.equal(vector.y);
      expect(vectorCopy.z).to.equal(vector.z);
    });

    it("should copy of vector with only x and y", function() {
      var vector = new Vector({ x: 1, y: 2 });
      var vectorCopy = vector.copy();
      expect(vectorCopy.x).to.equal(vector.x);
      expect(vectorCopy.y).to.equal(vector.y);
      expect(vectorCopy.z).to.be.undefined;
    });

    it("shouldn't change copy if orig changes", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 });
      var vectorCopy = vector.copy();
      vector.x = 2;
      expect(vectorCopy.x).to.equal(1);
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

    it("should multiply vector of x and y by passed scalar", function() {
      var vector = new Vector({ x: 1, y: 2 });
      var newVector = vector.multiplyByScalar(3);
      expect(newVector.x).to.equal(3);
      expect(newVector.y).to.equal(6);
      expect(newVector.z).to.be.undefined;
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

    it("should add passed x, y vector", function() {
      var vector1 = new Vector({ x: 1, y: 2 });
      var vector2 = new Vector({ x: 4, y: 5 });
      var newVector = vector1.add(vector2);
      expect(newVector.x).to.equal(5);
      expect(newVector.y).to.equal(7);
      expect(newVector.z).to.be.undefined;
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

    it("should subtract passed vector", function() {
      var vector1 = new Vector({ x: 1, y: 2 });
      var vector2 = new Vector({ x: 4, y: 5 });
      var newVector = vector1.subtract(vector2);
      expect(newVector.x).to.equal(-3);
      expect(newVector.y).to.equal(-3);
      expect(newVector.z).to.be.undefined;
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

    it("should return magnitude for x, y vector", function() {
      var vector = new Vector({ x: 1, y: 2 });
      expect(vector.magnitude()).to.equal(2.23606797749979);
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
      expect(newVector.x).to.equal(0.2672612419124244);
      expect(newVector.y).to.equal(0.5345224838248488);
      expect(newVector.z).to.equal(0.8017837257372732);
    });

    it("should normalize x, y vector", function() {
      var vector = new Vector({ x: 1, y: 2 });
      var newVector = vector.normalize();
      expect(newVector.x).to.equal(0.4472135954999579);
      expect(newVector.y).to.equal(0.8944271909999159);
      expect(newVector.z).to.be.undefined;
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

    it("should get dot product of passed vector", function() {
      var vector1 = new Vector({ x: 1, y: 2, z: 3 });
      var vector2 = new Vector({ x: 4, y: 5, z: 6 });
      expect(vector1.dotProduct(vector2)).to.equal(32);
    });

    it("should get dot product of passed x, y vectors", function() {
      var vector1 = new Vector({ x: 1, y: 2 });
      var vector2 = new Vector({ x: 4, y: 5 });
      expect(vector1.dotProduct(vector2)).to.equal(14);
    });
  });

  describe("#filterDimensions", function() {
    it("can keep just x and y dimensions", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 })
          .filterDimensions(["x", "y"]);

      expect(vector).to.eql(new Vector({ x: 1, y: 2 }));
    });

    it("moves passed dimensions into x and y positions", function() {
      var vector = new Vector({ x: 1, y: 2, z: 3 })
          .filterDimensions(["y", "z"]);

      expect(vector).to.eql(new Vector({ x: 2, y: 3 }));
    });
  });
});
