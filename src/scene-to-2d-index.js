var Sphere = require("./sphere");
var Ray = require("./ray");
var Vector = require("./vector");
var drawSceneIn2d = require("./scene-to-2d");
var drawing = require("./drawing");

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
