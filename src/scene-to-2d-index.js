var Sphere = require("./sphere");
var Ray = require("./ray");
var Vector = require("./vector");
var Line = require("./line");
var Style = require("./style");
var RaySphereIntersection = require("./ray-sphere-intersection");
var DrawableEntity = require("./drawable-entity");
var drawSceneIn2d = require("./scene-to-2d");
var drawing = require("./drawing");
var geometry2d = require("./geometry-2d");

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

    entities.push(shadowRayLightIntersection.point(),
                  shadowRay);
  }

  return entities;
};

function entitiesToDraw(ray, sphere, lightSphere) {
  var entities = [sphere, lightSphere];

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
