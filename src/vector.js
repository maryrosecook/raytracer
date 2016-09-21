var checkObjectAttributes = require("./check-object-attributes");

var DIMENSIONS = ["x", "y", "z"];

function Vector(options) {
  var self = this;

  this._setDimensions(options);

  this.dimensions
    .forEach(function(dimension) {
      self[dimension] = options[dimension];
    });

  this.checkIsValid();
};

Vector.prototype = {
  checkIsValid: function() {
    var self = this;
    this.dimensions
      .map(function(dimension) { return self[dimension]; })
      .forEach(checkIsNumber);
  },

  copy: function() {
    this.checkIsValid();
    return new Vector(this);
  },

  multiplyByScalar: function(scalar) {
    this.checkIsValid();
    checkIsNumber(scalar);

    var self = this;
    var vectorObj = this.dimensions
        .reduce(function(vectorObj, dimension) {
          vectorObj[dimension] = self[dimension] * scalar;
          return vectorObj;
        }, {});

    return new Vector(vectorObj);
  },

  add: function(vector) {
    this.checkIsValid();
    vector.checkIsValid();

    var self = this;
    var vectorObj = this.dimensions
        .reduce(function(vectorObj, dimension) {
          vectorObj[dimension] = self[dimension] + vector[dimension];
          return vectorObj;
        }, {});

    return new Vector(vectorObj);
  },

  subtract: function(vector) {
    this.checkIsValid()
    vector.checkIsValid();

    var self = this;
    var vectorObj = this.dimensions
        .reduce(function(vectorObj, dimension) {
          vectorObj[dimension] = self[dimension] - vector[dimension];
          return vectorObj;
        }, {});

    return new Vector(vectorObj);
  },

  magnitude: function() {
    this.checkIsValid();

    var self = this;
    var squaredSum = this.dimensions
        .map(function(dimension) {
          return Math.pow(self[dimension], 2);
        })
        .reduce(function(sum, squared) {
          return sum + squared;
        });

    return Math.sqrt(squaredSum);
  },

  normalize: function() {
    this.checkIsValid();
    var vectorMagnitude = this.magnitude();

    var self = this;
    var vectorObj = this.dimensions
        .reduce(function(vectorObj, dimension) {
          vectorObj[dimension] = self[dimension] / vectorMagnitude;
          return vectorObj;
        }, {});

    return new Vector(vectorObj);
  },

  dotProduct: function(vector) {
    this.checkIsValid()
    vector.checkIsValid();

    var self = this;
    return this.dimensions
        .map(function(dimension) {
          return self[dimension] * vector[dimension];
        })
        .reduce(function(sum, squared) {
          return sum + squared;
        });
  },

  filterDimensions: function(dimensions) {
    var self = this;
    var vectorObj = dimensions
        .reduce(function(vectorObj, dimension, i) {
          vectorObj[DIMENSIONS[i]] = self[dimension];
          return vectorObj;
        }, {});

    return new Vector(vectorObj);
  },

  _setDimensions: function(options) {
    this.dimensions = DIMENSIONS
      .filter(function(dimension) { return dimension in options; });
  }
};

function checkIsNumber(number) {
  if (typeof number !== "number") {
    throw new Error("Should be a number");
  }
};

module.exports = Vector;
