var checkObjectAttributes = require("./check-object-attributes");

function Ray(options) {
  checkObjectAttributes(options, ["origin", "direction"]);

  this.origin = options.origin.copy();
  this.direction = options.direction.copy();
};

Ray.prototype = {
  isIntersecting: function(sphere) {
    return this._distanceRayToSphereCenter(sphere) <=
      sphere.radius;
  },

  intersectionPoint: function(sphere) {
    if (!this.isIntersecting(sphere)) {
      throw new Error("Not intersecting");
    }

    var intersectionDistanceAlongRay = this._tca(sphere) -
        this._thc(sphere);

    return this.origin.add(
      this.direction.multiplyByScalar(intersectionDistanceAlongRay));
  },

  _distanceRayToSphereCenter: function(sphere) {
    var sphereCenterToRayOriginLength =
      this._sphereCenterToRayOriginVector(sphere).magnitude();

    return Math.sqrt(Math.pow(sphereCenterToRayOriginLength, 2) -
                     Math.pow(this._tca(sphere), 2));
  },

  _sphereCenterToRayOriginVector: function(sphere) {
    return sphere.center.subtract(this.origin);
  },

  _tca: function(sphere) {
    return this._sphereCenterToRayOriginVector(sphere)
      .dotProduct(this.direction);
  },

  _thc: function(sphere) {
    var distanceRayToSphereCenter =
        this._distanceRayToSphereCenter(sphere);

    return Math.sqrt(Math.pow(sphere.radius, 2) -
                     Math.pow(distanceRayToSphereCenter, 2));
  }
};

module.exports = Ray;
