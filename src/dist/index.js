const converter = require("./converter");
const { writeFile } = require("fs-extra");
class Converter {
  constructor(file) {
    this.file = file;
  }

  setTargetFormat(format) {
    this.targetFormat = format;
    return this;
  }
  setStartTime(startTime) {
    this.startTime = startTime;
    return this;
  }
  setEndTime(endTime) {
    this.endTime = endTime;
    return this;
  }
  setquality(quality) {
    this.quality = quality;
    return this;
  }
  setBackground(background) {
    this.background = background;
    return this;
  }
  setFps(fps) {
    this.fps = fps;
    return this;
  }
  setSize(size) {
    this.size = size;
    return this;
  }
  setMethod(method) {
    this.method = method;
    return this;
  }

  setDiff(diff) {
    this.diff = diff;
    return this;
  }
  setLoop(loop) {
    this.loop = loop;
    return this;
  }

  async build() {
    if (!this.targetFormat) throw new Error("Target format is not set");
    if (!this.file) throw new Error("File is not set");
    this.result = await converter({
      file: this.file,
      targetFormat: this.targetFormat,
      startTime: this.startTime || 0,
      endTime: this.endTime || 10,
      quality: this.quality || 100,
      background: this.background || "#ffffff",
      fps: this.fps || 10,
      size: this.size || "original",
      method: this.method || "ffmpeg",
      diff: this.diff || "off",
      loop: this.loop || true,
    });
    return this;
  }

  async toBuffer() {
    this.result || (await this.build());
    return this.result;
  }

  defaultFilename() {
    return `./file-to-${this.targetFormat}.${this.targetFormat}`;
  }

  toFile = async (path) => {
    if (!this.result) await this.build();
    const pathName = path || this.defaultFilename();
    return writeFile(path, this.result);
  };
}
module.exports = Converter;
