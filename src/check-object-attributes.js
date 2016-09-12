;(function(exports) {
  function checkObjectAttributes(object, attributes) {
    if (!object) {
      throw new Error ("Requires object");
    }

    var missingOption = firstMissingAttribute(object, attributes);
    if (missingOption) {
      throw new Error ("Requires " + missingOption + " option");
    }
  };

  function firstMissingAttribute(object, attributes) {
    return attributes.filter(function(attribute) {
      return object[attribute] == null;
    })[0];
  };

  exports.checkObjectAttributes = checkObjectAttributes;
})(this);
