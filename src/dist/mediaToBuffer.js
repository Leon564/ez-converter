const { urlFileToBuffer } = require("./utils");
const validator = require("validator");
const { readFileSync } = require("fs-extra");

const MediaToBuffer = async (options) => {
  let file = options.file;
  if (!Buffer.isBuffer(file)) {
    if (validator.isURL(file)) file = await urlFileToBuffer(file);
    else file = readFileSync(file);
  }
  return file;
};
module.exports = MediaToBuffer;
