/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Sphere = __webpack_require__(1);
	var Cuboid = __webpack_require__(11);
	var Ray = __webpack_require__(3);
	var Vector = __webpack_require__(4);
	var Line = __webpack_require__(5);
	var RaySphereIntersection = __webpack_require__(6);
	var DrawableEntity = __webpack_require__(7);
	var drawSceneIn2d = __webpack_require__(8);
	var drawing = __webpack_require__(9);
	var geometry2d = __webpack_require__(10);
	
	var screen = document
	    .getElementById("screen")
	    .getContext("2d");
	
	var DIMENSIONS = ["x", "y"];
	
	var primaryRay = new Ray({
	  origin: new Vector({ x: -100, y: 150, z: 0 }),
	  direction: geometry2d.vectorFromAngle(0)
	}).filterDimensions(DIMENSIONS);
	
	var sphere = new Sphere({
	  center: new Vector({
	    x: 200,
	    y: 200,
	    z: 0
	  }),
	  radius: 100
	}).filterDimensions(DIMENSIONS);
	
	var projectionScreen = new Cuboid({
	  center: new Vector({
	    x: 0,
	    y: 200,
	    z: 0
	  }),
	  dimensions: new Vector({
	    x: 1,
	    y: 200,
	    z: 200
	  })
	}).filterDimensions(DIMENSIONS);
	
	var lightSphere = new Sphere({
	  center: new Vector({
	    x: 50,
	    y: 0,
	    z: -100
	  }),
	  radius: 30
	}).filterDimensions(DIMENSIONS);
	
	function generateShadowRay(intersection, lightSphere) {
	  return new Ray({
	    origin: intersection,
	    direction: lightSphere.center.subtract(intersection).normalize()
	  });
	};
	
	function shadowRayIntersectionEntities(ray, sphere) {
	  var entities = [];
	
	  var shadowRay = generateShadowRay(
	    new RaySphereIntersection(ray, sphere).point(),
	    lightSphere);
	
	  var shadowRaySphereIntersection =
	      new RaySphereIntersection(shadowRay, sphere);
	
	  if (!shadowRaySphereIntersection.exists()) {
	    var shadowRayLightIntersection =
	        new RaySphereIntersection(shadowRay, lightSphere);
	
	    entities.push(shadowRayLightIntersection.point(),
	                  shadowRay);
	  }
	
	  return entities;
	};
	
	function entitiesToDraw(ray, sphere, lightSphere, projectionScreen) {
	  var entities = [sphere, lightSphere, projectionScreen];
	
	  if (new RaySphereIntersection(ray, sphere).exists()) {
	    var primaryRayLine = new Line({
	      start: ray.origin,
	      end: new RaySphereIntersection(ray, sphere).point()
	    });
	
	    entities.push(primaryRayLine);
	    entities = entities.concat(
	      shadowRayIntersectionEntities(ray, sphere));
	
	    entities.push(new RaySphereIntersection(ray, sphere).point());
	  } else {
	    entities.push(ray);
	  }
	
	  return entities;
	};
	
	(function start() {
	  drawing.setCanvasSize(screen, 500, 500);
	
	  (function tick() {
	    var newDirection = geometry2d.angleFromVector(
	      primaryRay.direction) + 1;
	    drawing.setFocus(primaryRay.origin);
	    geometry2d.rotateRayTo(primaryRay, newDirection);
	    drawSceneIn2d(screen, entitiesToDraw(primaryRay,
	                                         sphere,
	                                         lightSphere,
	                                         projectionScreen));
	    requestAnimationFrame(tick);
	  })();
	})();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var checkObjectAttributes = __webpack_require__(2);
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

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
	
	module.exports = checkObjectAttributes;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var checkObjectAttributes = __webpack_require__(2);
	
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var checkObjectAttributes = __webpack_require__(2);
	
	var DIMENSIONS = ["x", "y", "z"];
	
	function Vector(options) {
	  var self = this;
	
	  this._setDimensions(options);
	
	  this.dimensions
	    .forEach(function(dimension) {
	      self[dimension] = options[dimension];
	    });
	
	  this.checkIsValid();
	};
	
	Vector.prototype = {
	  checkIsValid: function() {
	    var self = this;
	    this.dimensions
	      .map(function(dimension) { return self[dimension]; })
	      .forEach(checkIsNumber);
	  },
	
	  copy: function() {
	    this.checkIsValid();
	    return new Vector(this);
	  },
	
	  multiplyByScalar: function(scalar) {
	    this.checkIsValid();
	    checkIsNumber(scalar);
	
	    var self = this;
	    var vectorObj = this.dimensions
	        .reduce(function(vectorObj, dimension) {
	          vectorObj[dimension] = self[dimension] * scalar;
	          return vectorObj;
	        }, {});
	
	    return new Vector(vectorObj);
	  },
	
	  add: function(vector) {
	    this.checkIsValid();
	    vector.checkIsValid();
	
	    var self = this;
	    var vectorObj = this.dimensions
	        .reduce(function(vectorObj, dimension) {
	          vectorObj[dimension] = self[dimension] + vector[dimension];
	          return vectorObj;
	        }, {});
	
	    return new Vector(vectorObj);
	  },
	
	  subtract: function(vector) {
	    this.checkIsValid()
	    vector.checkIsValid();
	
	    var self = this;
	    var vectorObj = this.dimensions
	        .reduce(function(vectorObj, dimension) {
	          vectorObj[dimension] = self[dimension] - vector[dimension];
	          return vectorObj;
	        }, {});
	
	    return new Vector(vectorObj);
	  },
	
	  magnitude: function() {
	    this.checkIsValid();
	
	    var self = this;
	    var squaredSum = this.dimensions
	        .map(function(dimension) {
	          return Math.pow(self[dimension], 2);
	        })
	        .reduce(function(sum, squared) {
	          return sum + squared;
	        });
	
	    return Math.sqrt(squaredSum);
	  },
	
	  normalize: function() {
	    this.checkIsValid();
	    var vectorMagnitude = this.magnitude();
	
	    var self = this;
	    var vectorObj = this.dimensions
	        .reduce(function(vectorObj, dimension) {
	          vectorObj[dimension] = self[dimension] / vectorMagnitude;
	          return vectorObj;
	        }, {});
	
	    return new Vector(vectorObj);
	  },
	
	  dotProduct: function(vector) {
	    this.checkIsValid()
	    vector.checkIsValid();
	
	    var self = this;
	    return this.dimensions
	        .map(function(dimension) {
	          return self[dimension] * vector[dimension];
	        })
	        .reduce(function(sum, squared) {
	          return sum + squared;
	        });
	  },
	
	  filterDimensions: function(dimensions) {
	    var self = this;
	    var vectorObj = dimensions
	        .reduce(function(vectorObj, dimension, i) {
	          vectorObj[DIMENSIONS[i]] = self[dimension];
	          return vectorObj;
	        }, {});
	
	    return new Vector(vectorObj);
	  },
	
	  _setDimensions: function(options) {
	    this.dimensions = DIMENSIONS
	      .filter(function(dimension) { return dimension in options; });
	  }
	};
	
	function checkIsNumber(number) {
	  if (typeof number !== "number") {
	    throw new Error("Should be a number");
	  }
	};
	
	module.exports = Vector;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function Line(options) {
	  this.start = options.start;
	  this.end = options.end;
	};
	
	module.exports = Line;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var checkObjectAttributes = __webpack_require__(2);
	
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


/***/ },
/* 7 */
/***/ function(module, exports) {

	function DrawableEntity(entity, style) {
	  this.entity = entity;
	  this.style = style;
	};
	
	module.exports = DrawableEntity;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Sphere = __webpack_require__(1);
	var Cuboid = __webpack_require__(11);
	var Ray = __webpack_require__(3);
	var Vector = __webpack_require__(4);
	var Line = __webpack_require__(5);
	var drawing = __webpack_require__(9);
	
	function drawSceneIn2d(screen, entities) {
	  screen.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
	  drawEntities(screen, entities);
	};
	
	function drawEntities(screen, entities) {
	  entities.forEach(function(entity) {
	    drawFunctionForEntity(entity)(screen, entity);
	  });
	};
	
	function drawFunctionForEntity(entity) {
	  return drawFnMappings.filter(function(drawFnMapping) {
	    return entity instanceof drawFnMapping.constructor;
	  })[0].fn;
	};
	
	var drawFnMappings = [
	  { constructor: Sphere, fn: drawSphere },
	  { constructor: Cuboid, fn: drawCuboid },
	  { constructor: Ray, fn: drawRay },
	  { constructor: Vector, fn: drawVector },
	  { constructor: Line, fn: drawLine }
	];
	
	function drawSphere(screen, sphere) {
	  drawing.strokeCircle(screen,
	                       sphere.center,
	                       sphere.radius);
	};
	
	function drawCuboid(screen, cuboid) {
	  drawing.strokeRect(screen,
	                     cuboid.center,
	                     cuboid.dimensions);
	};
	
	function drawRay(screen, ray) {
	  drawVector(screen, ray.origin);
	  drawLineBody(screen, ray.origin, offscreenRayPoint(ray));
	};
	
	function drawLine(screen, line) {
	  drawVector(screen, line.start);
	  drawVector(screen, line.end);
	  drawLineBody(screen, line.start, line.end);
	};
	
	function drawVector(screen, vector) {
	  drawing.strokeCircle(screen, vector, 5);
	};
	
	function drawLineBody(screen, start, end) {
	  drawing.strokeLine(screen, start, end);
	};
	
	function offscreenRayPoint(ray) {
	  return ray.origin.add(ray.direction.multiplyByScalar(1000));
	};
	
	module.exports = drawSceneIn2d;


/***/ },
/* 9 */
/***/ function(module, exports) {

	var focus = {
	  x: 0,
	  y: 0
	};
	
	var scale = 1;
	
	function scaleAndFocus(screen) {
	  screen.save();
	  screen.scale(scale, scale);
	  screen.lineWidth = 1 / scale;
	  screen.translate(-focus.x + screen.canvas.width / 2 / scale,
	                   -focus.y + screen.canvas.height / 2 / scale);
	};
	
	function unscaleAndUnfocus(screen) {
	  screen.restore();
	};
	
	function strokeLine(screen, start, end, strokeStyle) {
	  scaleAndFocus(screen);
	  screen.strokeStyle = strokeStyle;
	  screen.moveTo(start.x, start.y);
	  screen.lineTo(end.x, end.y);
	  screen.stroke();
	  unscaleAndUnfocus(screen);
	};
	
	function strokeRect(screen, center, size, strokeStyle) {
	  scaleAndFocus(screen);
	  screen.strokeStyle = strokeStyle;
	  screen.strokeRect(center.x - size.x / 2,
	                    center.y - size.y / 2,
	                    size.x,
	                    size.y);
	  unscaleAndUnfocus(screen);
	};
	
	function strokeCircle(screen, center, radius, strokeStyle) {
	  scaleAndFocus(screen);
	  defineCircle(screen, center, radius);
	  screen.strokeStyle = strokeStyle;
	  screen.stroke();
	  unscaleAndUnfocus(screen);
	};
	
	function defineCircle(screen, center, radius) {
	  screen.beginPath();
	  screen.arc(center.x,
	             center.y,
	             radius,
	             0,
	             Math.PI * 2,
	             true);
	  screen.closePath();
	};
	
	function setCanvasSize(screen, width, height) {
	  screen.canvas.width = width;
	  screen.canvas.height = height;
	};
	
	function setFocus(inFocus) {
	  focus = {
	    x: inFocus.x,
	    y: inFocus.y
	  };
	};
	
	function getFocus() {
	  return focus;
	};
	
	module.exports = {
	  strokeLine: strokeLine,
	  strokeCircle: strokeCircle,
	  strokeRect: strokeRect,
	  setCanvasSize: setCanvasSize,
	  setFocus: setFocus,
	  getFocus: getFocus
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Vector = __webpack_require__(4);
	
	function vectorFromAngle(angle) {
	  var r = radians(angle);
	  var up = { x: 0, y: -1 };
	  var x = Math.cos(r) * up.x - Math.sin(r) * up.y;
	  var y = Math.sin(r) * up.x + Math.cos(r) * up.y;
	  return new Vector({ x: x, y: y, z: 0 }).normalize();
	};
	
	function angleFromVector(vector) {
	  var unitVector = vector.normalize();
	  var uncorrectedDegrees = degrees(Math.atan2(unitVector.x,
	                                              -unitVector.y));
	  var angle = uncorrectedDegrees;
	  if(uncorrectedDegrees < 0) {
	    angle = 360 + uncorrectedDegrees;
	  }
	
	  return angle;
	};
	
	function rotateRayTo(ray, angle) {
	  ray.direction = vectorFromAngle(angle);
	};
	
	function radians(degrees) {
	  return degrees * Math.PI / 180;
	};
	
	function degrees(radians) {
	  return radians * 180 / Math.PI;
	};
	
	module.exports = {
	  vectorFromAngle: vectorFromAngle,
	  angleFromVector: angleFromVector,
	  rotateRayTo: rotateRayTo
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var checkObjectAttributes = __webpack_require__(2);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=scene-to-2d.js.map