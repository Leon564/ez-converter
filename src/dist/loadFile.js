const formData = require("form-data");
const axios = require("axios");
const cheerio = require("cheerio");

const baseUrl = "https://ezgif.com";

const loadFile = async (options) => {
  const data = new formData();
  data.append("new-image", options.file, `image.${options.fileExt}`);
  
  const result = await axios({
    method: "POST",
    url: `${baseUrl}/${options.sourceFormat}-to-${options.targetFormat}`,
    data: data,
    headers: data.getHeaders(),
  });
  const $ = cheerio.load(result.data);
  const newUrl = $("form").attr("action");
  return newUrl.includes(".com") ? newUrl : baseUrl + newUrl;
};

module.exports = loadFile;
