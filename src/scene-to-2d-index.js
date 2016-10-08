var Sphere = require("./sphere");
var Cuboid = require("./cuboid");
var Ray = require("./ray");
var Vector = require("./vector");
var Line = require("./line");
var RaySphereIntersection = require("./ray-sphere-intersection");
var DrawableEntity = require("./drawable-entity");
var drawSceneIn2d = require("./scene-to-2d");
var drawing = require("./drawing");
var geometry2d = require("./geometry-2d");

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
