const axios = require("axios");

const getFileType = async (data) => {
  const { fileTypeFromBuffer, fileTypeFromFile } = await import("file-type");
  const type = Buffer.isBuffer(data)
    ? await fileTypeFromBuffer(data)
    : await fileTypeFromFile(data);
  if (!type) {
    throw new Error("Invalid file type");
  }
  return type;
};

module.exports = {
  getFileType,
};
