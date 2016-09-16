var Vector = require("./vector");

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
