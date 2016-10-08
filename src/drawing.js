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

function strokeRect(screen, center, size, strokeStyle) {
  scaleAndFocus(screen);
  screen.strokeStyle = strokeStyle;
  screen.strokeRect(center.x - size.x / 2,
                    center.y - size.y / 2,
                    size.x,
                    size.y);
  unscaleAndUnfocus(screen);
};

function strokeCircle(screen, center, radius, strokeStyle) {
  scaleAndFocus(screen);
  defineCircle(screen, center, radius);
  screen.strokeStyle = strokeStyle;
  screen.stroke();
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
  strokeRect: strokeRect,
  setCanvasSize: setCanvasSize,
  setFocus: setFocus,
  getFocus: getFocus
};
