var Sphere = require("./sphere");
var Ray = require("./ray");
var Vector = require("./vector");
var Line = require("./line");
var drawing = require("./drawing");

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
  { constructor: Ray, fn: drawRay },
  { constructor: Vector, fn: drawVector },
  { constructor: Line, fn: drawLine }
];

function drawSphere(screen, sphere) {
  drawing.strokeCircle(screen,
                       sphere.center,
                       sphere.radius);
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
