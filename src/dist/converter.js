const loadFile = require("./loadFile");
const processFile = require("./processFile");
const { getFileType, urlFileToBuffer } = require("./utils");
const mediaToBuffer = require("./mediaToBuffer");

const converter = async (options) => {
  options.file = await mediaToBuffer(options);
  const mime = await getFileType(options.file);
  options.sourceFormat = mime.mime.includes("video") ? "video" : mime.ext;
  options.fileExt = mime.ext;
  options.newUrl = await loadFile(options);
  let data = await processFile(options);
  return urlFileToBuffer(data);
};
module.exports = converter;
