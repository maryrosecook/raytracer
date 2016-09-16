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
	var Ray = __webpack_require__(3);
	var Vector = __webpack_require__(4);
	var Line = __webpack_require__(5);
	var Style = __webpack_require__(11);
	var RaySphereIntersection = __webpack_require__(6);
	var DrawableEntity = __webpack_require__(7);
	var drawSceneIn2d = __webpack_require__(8);
	var drawing = __webpack_require__(9);
	var geometry2d = __webpack_require__(10);
	
	var screen = document
	    .getElementById("screen")
	    .getContext("2d");
	
	var primaryRay = new Ray({
	  origin: new Vector({ x: 50, y: 200, z: 0 }),
	  direction: geometry2d.vectorFromAngle(0)
	});
	
	var sphere = new Sphere({
	  center: new Vector({
	    x: 200,
	    y: 200,
	    z: 0
	  }),
	  radius: 100
	});
	
	var lightSphere = new Sphere({
	  center: new Vector({
	    x: 50,
	    y: 0,
	    z: 0
	  }),
	  radius: 30
	});
	
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
	
	    entities.push(new DrawableEntity(
	      shadowRayLightIntersection.point(), {
	        strokeStyle: "black",
	        zindex: 2
	      }));
	
	    entities.push(new DrawableEntity(shadowRay, {
	      strokeStyle: "black",
	      zindex: -1
	    }));
	  }
	
	  return entities;
	};
	
	function entitiesToDraw(ray, sphere, lightSphere) {
	  var entities = [
	    new DrawableEntity(sphere, new Style()),
	    new DrawableEntity(lightSphere,
	                       new Style({ fillStyle: "yellow" }))
	  ];
	
	  if (new RaySphereIntersection(ray, sphere).exists()) {
	    var primaryRayLine = new Line({
	      start: ray.origin,
	      end: new RaySphereIntersection(ray, sphere).point()
	    });
	
	    entities.push(new DrawableEntity(primaryRayLine, new Style()));
	    entities = entities.concat(
	      shadowRayIntersectionEntities(ray, sphere));
	
	    entities.push(new DrawableEntity(
	      new RaySphereIntersection(ray, sphere).point(),
	      new Style()));
	  } else {
	    entities.push(new DrawableEntity(ray, new Style({ zindex: -1 })));
	  }
	
	  return entities;
	};
	
	(function start() {
	  drawing.setCanvasSize(screen, 500, 500);
	  drawing.setFocus(screen.canvas.width / 2, screen.canvas.height / 2);
	
	  (function tick() {
	    var newDirection = geometry2d.angleFromVector(
	      primaryRay.direction) + 1;
	    geometry2d.rotateRayTo(primaryRay, newDirection);
	    drawSceneIn2d(screen, entitiesToDraw(primaryRay,
	                                         sphere,
	                                         lightSphere));
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
	var Ray = __webpack_require__(3);
	var Vector = __webpack_require__(4);
	var Line = __webpack_require__(5);
	var drawing = __webpack_require__(9);
	
	function drawSceneIn2d(screen, drawableEntities) {
	  screen.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
	  drawEntities(screen, drawableEntities);
	};
	
	function drawEntities(screen, drawableEntities) {
	  drawableEntities.sort(function(drawableEntity1, drawableEntity2) {
	    return drawableEntity1.style.zindex -
	      drawableEntity2.style.zindex;
	  }).forEach(function(drawableEntity) {
	    drawFunctionForEntity(drawableEntity)(screen,
	                                          drawableEntity.entity,
	                                          drawableEntity.style);
	  });
	};
	
	function drawFunctionForEntity(drawableEntity) {
	  return drawFnMappings.filter(function(drawFnMapping) {
	    return drawableEntity.entity
	      instanceof drawFnMapping.constructor;
	  })[0].fn;
	};
	
	var drawFnMappings = [
	  { constructor: Sphere, fn: drawSphere },
	  { constructor: Ray, fn: drawRay },
	  { constructor: Vector, fn: drawVector },
	  { constructor: Line, fn: drawLine }
	];
	
	function drawSphere(screen, sphere, style) {
	  if (style.strokeStyle) {
	    drawing.strokeCircle(screen,
	                         sphere.center,
	                         sphere.radius,
	                         style.strokeStyle);
	  }
	
	  if (style.fillStyle) {
	    drawing.fillCircle(screen,
	                       sphere.center,
	                       sphere.radius,
	                       style.fillStyle);
	  }
	};
	
	function drawRay(screen, ray, style) {
	  drawVector(screen, ray.origin, style);
	  drawLineBody(screen,
	               ray.origin,
	               offscreenRayPoint(ray),
	               style);
	};
	
	function drawLine(screen, line, style) {
	  drawVector(screen, line.start, style);
	  drawVector(screen, line.end, style);
	  drawLineBody(screen,
	               line.start,
	               line.end,
	               style);
	};
	
	function drawVector(screen, vector, style) {
	  drawing.strokeCircle(screen, vector, 5, style.strokeStyle);
	};
	
	function drawLineBody(screen, start, end, style) {
	  drawing.strokeLine(screen, start, end, style.strokeStyle);
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
	
	function strokeCircle(screen, center, radius, strokeStyle) {
	  scaleAndFocus(screen);
	  defineCircle(screen, center, radius);
	  screen.strokeStyle = strokeStyle;
	  screen.stroke();
	  unscaleAndUnfocus(screen);
	};
	
	function fillCircle(screen, center, radius, fillStyle) {
	  scaleAndFocus(screen);
	  defineCircle(screen, center, radius);
	  screen.fillStyle = fillStyle;
	  screen.fill();
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
	  fillCircle: fillCircle,
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
/***/ function(module, exports) {

	function Style(options) {
	  options = options || {};
	  if (options.fillStyle) {
	    this.fillStyle = options.fillStyle;
	    this.strokeStyle = options.strokeStyle;
	  } else {
	    this.strokeStyle = options.strokeStyle || "black";
	  }
	
	  this.zindex = options.zindex !== undefined ? options.zindex : 0;
	};
	
	module.exports = Style;


/***/ }
/******/ ]);
//# sourceMappingURL=scene-to-2d.js.map