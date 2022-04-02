let formData = require("form-data");
let fs = require("fs");
let axios = require("axios");
let cheerio = require("cheerio");

let url = "https://ezgif.com";
const loadfile = async (file, type) => {
  file = Buffer.isBuffer(file) ? file : fs.readFileSync(file);
  let data = new formData();
  data.append(
    "new-image",
    file,
    `image.${type.substring(type.lastIndexOf("-") + 1)}`
  );
  let result = await axios({
    method: "POST",
    url: `${url}/${type}`,
    data: data,
    headers: data.getHeaders(),
  });
  let $ = cheerio.load(result.data);
  let newUrl = $("form").attr("action");
  return newUrl.includes(".com") ? newUrl : url + newUrl;
};

const optionProcess = async (newUrl) => {
  let data = new formData();
  let file = newUrl.substring(newUrl.lastIndexOf("/") + 1);
  data.append("file", file);
  data.append("end", 10);
  data.append("percentage", 100);
  data.append("background", "#ffffff");

  let options = await axios({
    method: "POST",
    url: newUrl,
    data: data,
    headers: data.getHeaders(),
  });

  let cLoad = cheerio.load(options.data);
  let output = cLoad("div#output").html();
  let cOutput = cheerio.load(output);
  return cOutput("a[class=save]").attr("href");
};
const imageToBuffer = async (url) => {
  let img = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(img.data, "utf-8");
};

const ezgif = async (buffer, type) => {
  if (!type) return "error: type is not defined";
  let cResultData = await loadfile(buffer, type);
  let data = await optionProcess(cResultData);
  return imageToBuffer(data);
};

module.exports = {
  webp_to_mp4: (file) => ezgif(file, "webp-to-mp4"),
  video_to_webp: (file) => ezgif(file, "video-to-webp"),
  video_to_gif: (file) => ezgif(file, "video-to-gif"),
  gif_to_mp4: (file) => ezgif(file, "gif-to-mp4"),
  gif_to_webp: (file) => ezgif(file, "gif-to-webp"),
  jpg_to_webp: (file) => ezgif(file, "jpg-to-webp"),
  png_to_webp: (file) => ezgif(file, "png-to-webp"),
  webp_to_png: (file) => ezgif(file, "webp-to-png"),
  webp_to_jpg: (file) => ezgif(file, "webp-to-jpg"),
};
