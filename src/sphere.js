var checkObjectAttributes =
    require("./check-object-attributes").checkObjectAttributes;

;(function(exports) {
  function Sphere(options) {
    checkObjectAttributes(options, ["x", "y", "z", "radius"]);

    this.x = options.x;
    this.y = options.y;
    this.z = options.z;
    this.radius = options.radius;
  };

  exports.Sphere = Sphere;
})(this);
