var checkObjectAttributes =
    require("./check-object-attributes").checkObjectAttributes;

;(function(exports) {
  function Ray(options) {
    checkObjectAttributes(options, ["origin", "direction"]);
    checkObjectAttributes(options.origin, ["x", "y", "z"]);
    checkObjectAttributes(options.direction, ["x", "y", "z"]);

    this.origin = options.origin;
    this.direction = options.direction;
  };

  Ray.prototype = {
    isIntersecting: function(sphere) {
      return this._minimumDistanceFromRayToSphereCenter(sphere) <=
        sphere.radius;
    },
      // var thc = Math.sqrt(Math.pow(sphere.radius, 2) -
      //                     Math.pow(d, 2));

    _minimumDistanceFromRayToSphereCenter: function(sphere) {
      // for what letters mean, see Mary's notebook
      var D = this.direction;
      var Lvector = subtract(sphere.center, this.origin);
      var Lmagnitude = magnitude(Lvector);
      var tca = dotProduct(Lvector, D);
      var d = Math.sqrt(Math.pow(Lmagnitude, 2) -
                        Math.pow(tca, 2));
      return d;
    }
  };


  function subtract(vector1, vector2) {
    return {
      x: vector1.x - vector2.x,
      y: vector1.y - vector2.y,
      z: vector1.z - vector2.z
    };
  };

  function magnitude(vector) {
    return Math.sqrt(vector.x * vector.x +
                     vector.y * vector.y +
                     vector.z * vector.z);
  };

  function normalise(vector) {
    var vectorMagnitude = magnitude(vector);
    return {
      x: vector.x / vectorMagnitude,
      y: vector.y / vectorMagnitude,
      z: vector.z / vectorMagnitude
    };
  };

  function dotProduct(vector1, vector2) {
    return vector1.x * vector2.x +
      vector1.y * vector2.y +
      vector1.z * vector2.z;
  };

  exports.Ray = Ray;
})(this);
