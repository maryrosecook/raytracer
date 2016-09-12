var checkObjectAttributes =
    require("./check-object-attributes").checkObjectAttributes;

;(function(exports) {
  function Sphere(options) {
    checkObjectAttributes(options, ["x", "y", "z", "radius"]);

    this.center = {
      x: options.x,
      y: options.y,
      z: options.z
    };

    this.radius = options.radius;
  };

  exports.Sphere = Sphere;
})(this);
