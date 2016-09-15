function strokeLine(screen, start, end) {
  screen.moveTo(start.x, start.y);
  screen.lineTo(end.x, end.y);
  screen.stroke();
};

function strokeCircle(screen, center, radius) {
  screen.beginPath();
  screen.arc(center.x,
             center.y,
             radius,
             0,
             Math.PI * 2,
             true);
  screen.closePath();
  screen.stroke();
};

function setCanvasSize(screen, width, height) {
  screen.canvas.width = width;
  screen.canvas.height = height;
};

module.exports = {
  strokeLine: strokeLine,
  strokeCircle: strokeCircle,
  setCanvasSize: setCanvasSize
};
