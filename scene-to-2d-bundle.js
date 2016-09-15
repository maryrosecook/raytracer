/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Sphere = __webpack_require__(1);
	var Ray = __webpack_require__(3);
	var Vector = __webpack_require__(4);
	var drawSceneIn2d = __webpack_require__(5);
	var drawing = __webpack_require__(6);

	var screen = document
	    .getElementById("screen")
	    .getContext("2d");

	var ray = new Ray({
	  origin: new Vector({ x: 50, y: 200, z: 200 }),
	  direction: new Vector({
	    x: 0,
	    y: -1,
	    z: 0
	  }).normalize()
	});

	var sphere = new Sphere({
	  center: new Vector({
	    x: 200,
	    y: 200,
	    z: 200
	  }),

	  radius: 100
	});

	function vectorFromAngle(angle) {
	  var r = radians(angle);
	  var up = { x: 0, y: -1 };
	  var x = Math.cos(r) * up.x - Math.sin(r) * up.y;
	  var y = Math.sin(r) * up.x + Math.cos(r) * up.y;
	  return new Vector({ x: x, y: y, z: 0 }).normalize();
	};

	function rotateRayTo(ray, angle) {
	  ray.direction = vectorFromAngle(angle);
	};

	function radians(degrees) {
	  return degrees * Math.PI / 180;
	};

	(function start() {
	  drawing.setCanvasSize(screen, 500, 500);

	  var angle = 0;
	  (function tick() {
	    angle += 1;
	    rotateRayTo(ray, angle);
	    drawSceneIn2d(screen, ray, sphere);
	    requestAnimationFrame(tick);
	  })();
	})();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var checkObjectAttributes = __webpack_require__(2);

	function Sphere(options) {
	  checkObjectAttributes(options, ["center", "radius"]);
	  checkObjectAttributes(options.center, ["x", "y", "z"]);

	  this.center = options.center.copy();
	  this.radius = options.radius;
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

	  this.origin = options.origin.copy();
	  this.direction = options.direction.copy();
	};

	Ray.prototype = {
	  isIntersecting: function(sphere) {
	    return this._distanceRayToSphereCenter(sphere) <=
	      sphere.radius &&
	      this._intersectionDistanceAlongRay(sphere) >= 0;
	  },

	  intersectionPoint: function(sphere) {
	    if (!this.isIntersecting(sphere)) {
	      throw new Error("Not intersecting");
	    }

	    var intersectionDistanceAlongRay =
	        this._intersectionDistanceAlongRay(sphere);

	    return this.origin.add(
	      this.direction.multiplyByScalar(intersectionDistanceAlongRay));
	  },

	  _distanceRayToSphereCenter: function(sphere) {
	    var sphereCenterToRayOriginLength =
	        this._sphereCenterToRayOriginVector(sphere).magnitude();

	    return Math.sqrt(Math.pow(sphereCenterToRayOriginLength, 2) -
	                     Math.pow(this._tca(sphere), 2));
	  },

	  _intersectionDistanceAlongRay: function(sphere) {
	    return this._tca(sphere) - this._thc(sphere);
	  },

	  _sphereCenterToRayOriginVector: function(sphere) {
	    return sphere.center.subtract(this.origin);
	  },

	  _tca: function(sphere) {
	    return this._sphereCenterToRayOriginVector(sphere)
	      .dotProduct(this.direction);
	  },

	  _thc: function(sphere) {
	    var distanceRayToSphereCenter =
	        this._distanceRayToSphereCenter(sphere);

	    return Math.sqrt(Math.pow(sphere.radius, 2) -
	                     Math.pow(distanceRayToSphereCenter, 2));
	  }
	};

	module.exports = Ray;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var checkObjectAttributes = __webpack_require__(2);

	function Vector(options) {
	  this.x = options.x;
	  this.y = options.y;
	  this.z = options.z;

	  this.checkIsValid();
	};

	Vector.prototype = {
	  checkIsValid: function() {
	    checkIsNumber(this.x);
	    checkIsNumber(this.y);
	    checkIsNumber(this.z);
	  },

	  copy: function() {
	    this.checkIsValid();

	    return new Vector({
	      x: this.x,
	      y: this.y,
	      z: this.z
	    });
	  },

	  multiplyByScalar: function(scalar) {
	    this.checkIsValid();
	    checkIsNumber(scalar);

	    return new Vector({
	      x: this.x * scalar,
	      y: this.y * scalar,
	      z: this.z * scalar
	    });
	  },

	  add: function(vector) {
	    this.checkIsValid();
	    vector.checkIsValid();

	    return new Vector({
	      x: this.x + vector.x,
	      y: this.y + vector.y,
	      z: this.z + vector.z
	    });
	  },

	  subtract: function(vector) {
	    this.checkIsValid()
	    vector.checkIsValid();

	    return new Vector({
	      x: this.x - vector.x,
	      y: this.y - vector.y,
	      z: this.z - vector.z
	    });
	  },

	  magnitude: function() {
	    this.checkIsValid();
	    return Math.sqrt(Math.pow(this.x, 2) +
	                     Math.pow(this.y, 2) +
	                     Math.pow(this.z, 2));
	  },

	  normalize: function() {
	    this.checkIsValid();
	    var vectorMagnitude = this.magnitude();
	    return new Vector({
	      x: this.x / vectorMagnitude,
	      y: this.y / vectorMagnitude,
	      z: this.z / vectorMagnitude,
	    });
	  },

	  dotProduct: function(vector) {
	    this.checkIsValid()
	    vector.checkIsValid();

	    return this.x * vector.x +
	      this.y * vector.y +
	      this.z * vector.z;
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
/***/ function(module, exports, __webpack_require__) {

	var Sphere = __webpack_require__(1);
	var Ray = __webpack_require__(3);
	var Vector = __webpack_require__(4);
	var drawing = __webpack_require__(6);

	function drawSceneIn2d(screen, ray, sphere) {
	  screen.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
	  drawEntities(screen, [ray, sphere]);
	  drawIntersections(screen, ray, sphere);
	};

	function drawEntities(screen, entities) {
	  entities.forEach(function(entity) {
	    drawFunctionForEntity(entity)(screen, entity);
	  });
	};

	function drawIntersections(screen, ray, sphere) {
	  if (ray.isIntersecting(sphere)) {
	    var intersectionPoint = ray.intersectionPoint(sphere);
	    drawPoint(screen, intersectionPoint);
	  }
	};

	function drawFunctionForEntity(entity) {
	  return drawFnMappings.filter(function(drawFnMapping) {
	    return entity instanceof drawFnMapping.constructor;
	  })[0].fn;
	};

	var drawFnMappings = [
	  { constructor: Sphere, fn: drawSphere },
	  { constructor: Ray, fn: drawRay }
	];

	function drawSphere(screen, sphere) {
	  drawing.strokeCircle(screen, sphere.center, sphere.radius);
	};

	function drawRay(screen, ray) {
	  drawPoint(screen, ray.origin);
	  drawRayLine(screen, ray);
	};

	function drawPoint(screen, point) {
	  drawing.strokeCircle(screen, point, 5);
	};

	function drawRayLine(screen, ray) {
	  drawing.strokeLine(screen, ray.origin, offscreenRayPoint(ray));
	};

	function offscreenRayPoint(ray) {
	  return ray.origin.add(ray.direction.multiplyByScalar(1000));
	};

	module.exports = drawSceneIn2d;


/***/ },
/* 6 */
/***/ function(module, exports) {

	function strokeLine(screen, start, end) {
	  screen.moveTo(start.x, start.y);
	  screen.lineTo(end.x, end.y);
	  screen.stroke();
	};

	function strokeCircle(screen, center, radius) {
	  screen.beginPath();
	  screen.arc(center.x,
	             center.y,
	             radius,
	             0,
	             Math.PI * 2,
	             true);
	  screen.closePath();
	  screen.stroke();
	};

	function setCanvasSize(screen, width, height) {
	  screen.canvas.width = width;
	  screen.canvas.height = height;
	};

	module.exports = {
	  strokeLine: strokeLine,
	  strokeCircle: strokeCircle,
	  setCanvasSize: setCanvasSize
	};


/***/ }
/******/ ]);