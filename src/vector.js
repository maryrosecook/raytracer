var checkObjectAttributes = require("./check-object-attributes");

function Vector(options) {
  this.x = options.x;
  this.y = options.y;
  this.z = options.z;

  this.checkIsValid();
};

Vector.prototype = {
  checkIsValid: function() {
    checkIsNumber(this.x);
    checkIsNumber(this.y);
    checkIsNumber(this.z);
  },

  copy: function() {
    this.checkIsValid();

    return new Vector({
      x: this.x,
      y: this.y,
      z: this.z
    });
  },

  multiplyByScalar: function(scalar) {
    this.checkIsValid();
    checkIsNumber(scalar);

    return new Vector({
      x: this.x * scalar,
      y: this.y * scalar,
      z: this.z * scalar
    });
  },

  add: function(vector) {
    this.checkIsValid();
    vector.checkIsValid();

    return new Vector({
      x: this.x + vector.x,
      y: this.y + vector.y,
      z: this.z + vector.z
    });
  },

  subtract: function(vector) {
    this.checkIsValid()
    vector.checkIsValid();

    return new Vector({
      x: this.x - vector.x,
      y: this.y - vector.y,
      z: this.z - vector.z
    });
  },

  magnitude: function() {
    this.checkIsValid();
    return Math.sqrt(Math.pow(this.x, 2) +
                     Math.pow(this.y, 2) +
                     Math.pow(this.z, 2));
  },

  normalize: function() {
    this.checkIsValid();
    var vectorMagnitude = this.magnitude();
    this.x /= vectorMagnitude;
    this.y /= vectorMagnitude;
    this.z /= vectorMagnitude;
  },

  dotProduct: function(vector) {
    this.checkIsValid()
    vector.checkIsValid();

    return this.x * vector.x +
      this.y * vector.y +
      this.z * vector.z;
  }
};

function checkIsNumber(number) {
  if (typeof number !== "number") {
    throw new Error("Should be a number");
  }
};

module.exports = Vector;
