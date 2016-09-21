var checkObjectAttributes = require("./check-object-attributes");

function Sphere(options) {
  checkObjectAttributes(options, ["center", "radius"]);
  options.center.checkIsValid();

  this.center = options.center.copy();
  this.radius = options.radius;
};

Sphere.prototype = {
  copy: function() {
    return new Sphere(this);
  },

  filterDimensions: function(dimensions) {
    var filteredSphere = this.copy();
    filteredSphere.center = this.center.filterDimensions(dimensions);
    return filteredSphere;
  }
};

module.exports = Sphere;
