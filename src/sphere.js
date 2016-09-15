var checkObjectAttributes = require("./check-object-attributes");

function Sphere(options) {
  checkObjectAttributes(options, ["center", "radius"]);
  checkObjectAttributes(options.center, ["x", "y", "z"]);

  this.center = options.center.copy();
  this.radius = options.radius;
};

module.exports = Sphere;
