let formData = require("form-data");
let axios = require("axios");
let cheerio = require("cheerio");

let baseUrl = "https://ezgif.com";

const loadFile = async (options) => {
  let data = new formData();
  data.append("new-image", options.file, `image.${options.fileExt}`);
  let result = await axios({
    method: "POST",
    url: `${baseUrl}/${options.sourceFormat}-to-${options.targetFormat}`,
    data: data,
    headers: data.getHeaders(),
  });
  let $ = cheerio.load(result.data);
  let newUrl = $("form").attr("action");
  return newUrl.includes(".com") ? newUrl : baseUrl + newUrl;
};

module.exports = loadFile;
