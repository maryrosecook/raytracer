var checkObjectAttributes = require("./check-object-attributes");

function Ray(options) {
  checkObjectAttributes(options, ["origin", "direction"]);

  this.origin = options.origin.copy();
  this.direction = options.direction.copy();
};

module.exports = Ray;
