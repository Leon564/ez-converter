const loadFile = require("./loadFile");
const processFile = require("./processFile");
const { getFileType, urlFileToBuffer } = require("./utils");
const mediaToBuffer = require("./mediaToBuffer");

const converter = async (options) => {
  options.file = await mediaToBuffer(options);
  const {mime,ext} = await getFileType(options.file);
  options.sourceFormat = mime.includes("video") ? "video" : ext;
  options.fileExt = ext;
  options.newUrl = await loadFile(options);
  const data = await processFile(options);
  return urlFileToBuffer(data);
};
module.exports = converter;
