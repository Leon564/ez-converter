import axios from "axios";
import { fileTypeFromBuffer, fileTypeFromFile } from "file-type";

const getFileType = async (data) => {
  const type = Buffer.isBuffer(data)
    ? await fileTypeFromBuffer(data)
    : await fileTypeFromFile(data);
  if (!type) throw new Error("Invalid file type");

  return type;
};

const urlFileToBuffer = async (url) => {
  const file = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(file.data, "utf-8");
};

export { getFileType, urlFileToBuffer };
