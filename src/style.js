function Style(options) {
  options = options || {};
  if (options.fillStyle) {
    this.fillStyle = options.fillStyle;
    this.strokeStyle = options.strokeStyle;
  } else {
    this.strokeStyle = options.strokeStyle || "black";
  }

  this.zindex = options.zindex !== undefined ? options.zindex : 0;
};

module.exports = Style;
