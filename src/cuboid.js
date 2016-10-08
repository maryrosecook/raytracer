var checkObjectAttributes = require("./check-object-attributes");

function Cuboid(options) {
  checkObjectAttributes(options, ["center", "dimensions"]);
  options.center.checkIsValid();
  options.dimensions.checkIsValid();

  this.center = options.center.copy();
  this.dimensions = options.dimensions.copy();
};

Cuboid.prototype = {
  copy: function() {
    return new Cuboid(this);
  },

  filterDimensions: function(dimensions) {
    var filteredCuboid = this.copy();
    filteredCuboid.center = this.center.filterDimensions(dimensions);
    return filteredCuboid;
  }
};

module.exports = Cuboid;
