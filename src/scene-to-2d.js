var Sphere = require("./sphere");
var Ray = require("./ray");
var Vector = require("./vector");
var Line = require("./line");
var drawing = require("./drawing");

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
