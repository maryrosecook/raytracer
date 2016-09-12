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

  exports.Ray = Ray;
})(this);
