var Sphere = require("./sphere");
var Ray = require("./ray");
var Vector = require("./vector");
var Line = require("./line");
var RaySphereIntersection = require("./ray-sphere-intersection");
var DrawableEntity = require("./drawable-entity");
var drawSceneIn2d = require("./scene-to-2d");
var drawing = require("./drawing");

var screen = document
    .getElementById("screen")
    .getContext("2d");

var primaryRay = new Ray({
  origin: new Vector({ x: 50, y: 200, z: 0 }),
  direction: vectorFromAngle(0)
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

function generateShadowRay(intersection, lightSphere) {
  return new Ray({
    origin: intersection,
    direction: lightSphere.center.subtract(intersection).normalize()
  });
};

function entitiesToDraw(ray, sphere, lightSphere) {
  var entities = [
    new DrawableEntity(sphere, {
      strokeStyle: "black",
      zindex: 1
    }),

    new DrawableEntity(lightSphere, {
      fillStyle: "yellow",
      zindex: 1
    })
  ];

  var raySphereIntersection =
      new RaySphereIntersection(ray, sphere);

  if (raySphereIntersection.exists()) {
    var shadowRay = generateShadowRay(raySphereIntersection.point(),
                                      lightSphere);

    var primaryRayLine = new Line({
      start: ray.origin, end: raySphereIntersection.point()
    });

    entities.push(new DrawableEntity(primaryRayLine, {
      strokeStyle: "black",
      zindex: 1
    }));

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

    entities.push(new DrawableEntity(raySphereIntersection.point(), {
      strokeStyle: "black",
      zindex: 1
    }));
  } else {
    entities.push(new DrawableEntity(ray, {
      strokeStyle: "black",
      zindex: -1
    }));
  }

  return entities;
};

(function start() {
  drawing.setCanvasSize(screen, 500, 500);
  drawing.setFocus(screen.canvas.width / 2, screen.canvas.height / 2);

  (function tick() {
    rotateRayTo(primaryRay,
                angleFromVector(primaryRay.direction) + 1);
    drawSceneIn2d(screen, entitiesToDraw(primaryRay,
                                         sphere,
                                         lightSphere));
    requestAnimationFrame(tick);
  })();
})();
