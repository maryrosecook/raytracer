var Sphere = require("./sphere");
var Ray = require("./ray");
var Vector = require("./vector");
var drawing = require("./drawing");

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
