import loadFile from "./loadFile.js";
import processFile from "./processFile.js";
import { getFileType, urlFileToBuffer } from "./utils.js";
import mediaToBuffer from "./mediaToBuffer.js";

const converter = async (options) => {
  options.file = await mediaToBuffer(options);
  const { mime, ext } = await getFileType(options.file);
  options.sourceFormat = mime.includes("video") ? "video" : ext;
  options.fileExt = ext;
  options.newUrl = await loadFile(options);
  const data = await processFile(options);
  return urlFileToBuffer(data);
};

export default converter;
