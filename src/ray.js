var checkObjectAttributes = require("./check-object-attributes");

function Ray(options) {
  checkObjectAttributes(options, ["origin", "direction"]);
  options.origin.checkIsValid();
  options.direction.checkIsValid();

  this.origin = options.origin.copy();
  this.direction = options.direction.copy();
};

Ray.prototype = {
  copy: function() {
    return new Ray(this);
  },

  filterDimensions: function(dimensions) {
    var filteredRay = this.copy();
    filteredRay.origin = this.origin.filterDimensions(dimensions);
    filteredRay.direction = this.direction.filterDimensions(dimensions);
    return filteredRay;
  }
};

module.exports = Ray;
