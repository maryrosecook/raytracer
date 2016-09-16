var checkObjectAttributes = require("./check-object-attributes");

function RaySphereIntersection(ray, sphere) {
  if (!ray) {
    throw new Error("Requires ray");
  }

  if (!sphere) {
    throw new Error("Requires sphere");
  }

  this.ray = ray;
  this.sphere = sphere;
};

RaySphereIntersection.prototype = {
  exists: function() {
    return this._distanceRayToSphereCenter(this.sphere) <
        this.sphere.radius &&
        this._firstPositiveIntersectionDistance(this.sphere) !==
          undefined;
  },

  point: function() {
    if (!this.exists()) {
      throw new Error("Not intersecting");
    }

    var intersectionPointWhichMightBeInsideSphere =
        this._pointAlongRay(
          this._firstPositiveIntersectionDistance());

    return this._movePointOutsideSphere(
      intersectionPointWhichMightBeInsideSphere);
  },

  _pointAlongRay: function(distance) {
    return this.ray.origin
      .add(this.ray.direction.multiplyByScalar(distance));
  },

  _movePointOutsideSphere: function(point) {
    // Floating point inaccuracies sometimes put intersectionPoint
    // inside sphere and sometimes outside.  We always want to return
    // an intersectionPoint just outside the sphere.
    return point
      .subtract(this.sphere.center)
      .normalize()
      .multiplyByScalar(this.sphere.radius + 0.00000000000001)
      .add(this.sphere.center);
  },

  _firstPositiveIntersectionDistance: function() {
    var intersectionDistancesAlongRay =
        this._intersectionDistancesAlongRay(this.sphere);

    var positiveIntersections = intersectionDistancesAlongRay
        .filter(function(distance) { return distance > 0; });

    if (positiveIntersections.length === 2) {
      return Math.min(positiveIntersections[0],
                      positiveIntersections[1]);
    } else if (positiveIntersections.length === 1) {
      return positiveIntersections[0];
    }
  },

  _distanceRayToSphereCenter: function() {
    var sphereCenterToRayOriginLength =
        this._sphereCenterToRayOriginVector(this.sphere).magnitude();

    if (this._originRayCenterAdjacentLongerThanHypotenuse(
          this.sphere)) {
      return 0;
    } else {
      return Math.sqrt(Math.pow(sphereCenterToRayOriginLength, 2) -
                       Math.pow(this._tca(this.sphere), 2));
    }
  },

  _originRayCenterAdjacentLongerThanHypotenuse: function() {
    // Floating point has made ray origin sphere center triangle
    // illogical. This happens if ray goes through center of sphere,
    // but only some of the time.
    return this._sphereCenterToRayOriginVector(this.sphere)
      .magnitude() < this._tca(this.sphere);
  },

  _intersectionDistancesAlongRay: function() {
    return [
      this._tca(this.sphere) - this._thc(this.sphere),
      this._tca(this.sphere) + this._thc(this.sphere)
    ];
  },

  _sphereCenterToRayOriginVector: function() {
    return this.sphere.center.subtract(this.ray.origin);
  },

  _tca: function() {
    return this._sphereCenterToRayOriginVector(this.sphere)
      .dotProduct(this.ray.direction);
  },

  _thc: function() {
    var distanceRayToSphereCenter =
        this._distanceRayToSphereCenter(this.sphere);

    return Math.sqrt(Math.pow(this.sphere.radius, 2) -
                     Math.pow(distanceRayToSphereCenter, 2));
  }
};

module.exports = RaySphereIntersection;
