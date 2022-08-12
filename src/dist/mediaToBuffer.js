import { urlFileToBuffer } from "./utils.js";
import fs from "fs-extra";
import validator from "validator";

const MediaToBuffer = async (options) => {
  let { file } = options;
  if (!Buffer.isBuffer(file)) {
    if (validator.isURL(file)) file = await urlFileToBuffer(file);
    else file = fs.readFileSync(file);
  }
  return file;
};
export default MediaToBuffer;
