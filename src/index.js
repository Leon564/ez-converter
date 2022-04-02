let formData = require("form-data");
let fs = require("fs");
let axios = require("axios");
let cheerio = require("cheerio");
var validator = require("validator");
let baseUrl = "https://ezgif.com";

const imageToBuffer = async (url) => {
  let img = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(img.data, "utf-8");
};

const loadfile = async (file, type, source_format) => {
  if (!Buffer.isBuffer(file)) {
    if (validator.isURL(file)) file = await imageToBuffer(file);
    else file = fs.readFileSync(file);
  }
  let data = new formData();
  data.append("new-image", file, `image.${source_format}`);
  let result = await axios({
    method: "POST",
    url: `${baseUrl}/${type}`,
    data: data,
    headers: data.getHeaders(),
  });
  let $ = cheerio.load(result.data);
  let newUrl = $("form").attr("action");
  return newUrl.includes(".com") ? newUrl : baseUrl + newUrl;
};

const optionProcess = async (newUrl, options) => {
  let data = new formData();
  let file = newUrl.substring(newUrl.lastIndexOf("/") + 1);
  data.append("file", file);
  data.append("start", options.start || 0);
  data.append("end", options.duration || 100);
  data.append("percentage", options.quality || 100);
  data.append("background", options.background || "#ffffff");
  data.append("size", options.size || "original");
  data.append("fps", options.fps || 10);
  data.append("method", options.method || "ffmpeg");
  data.append("diff", options.diff || "off");

  let processOptions = await axios({
    method: "POST",
    url: newUrl,
    data: data,
    headers: data.getHeaders(),
  });

  let cLoad = cheerio.load(processOptions.data);
  let output = cLoad("div#output").html();
  let cOutput = cheerio.load(output);
  return cOutput("a[class=save]").attr("href");
};

const ezgif = async (buffer, type, options) => {
  if (!type) return "error: type is not defined";
  let cResultData = await loadfile(buffer, type, options.source_format);
  let data = await optionProcess(cResultData, options);
  return imageToBuffer(data);
};
const optionsVars = {
  start: null,
  end: null,
  percentage: null,
  background: null,
  size: null,
  fps: null,
  method: null,
  diff: null,
};
module.exports = {
  webp_to_mp4: (
    file,
    options = {
      source_format: "webp",
      ...optionsVars,
    }
  ) => ezgif(file, "webp-to-mp4", options),
  video_to_webp: (
    file,
    options = {
      source_format: "mp4",
      ...optionsVars,
    }
  ) => ezgif(file, "video-to-webp", options),
  video_to_gif: (
    file,
    options = {
      source_format: "mp4",
      ...optionsVars,
    }
  ) => ezgif(file, "video-to-gif", options),
  gif_to_mp4: (
    file,
    options = {
      source_format: "gif",
      ...optionsVars,
    }
  ) => ezgif(file, "gif-to-mp4", options),
  gif_to_webp: (
    file,
    options = {
      source_format: "gif",
      ...optionsVars,
    }
  ) => ezgif(file, "gif-to-webp", options),
  jpg_to_webp: (
    file,
    options = {
      source_format: "jpg",
      ...optionsVars,
    }
  ) => ezgif(file, "jpg-to-webp", options),
  png_to_webp: (
    file,
    options = {
      source_format: "png",
      ...optionsVars,
    }
  ) => ezgif(file, "png-to-webp", options),
  webp_to_png: (
    file,
    options = {
      source_format: "webp",
      ...optionsVars,
    }
  ) => ezgif(file, "webp-to-png", options),
  webp_to_jpg: (
    file,
    options = {
      source_format: "webp",
      ...optionsVars,
    }
  ) => ezgif(file, "webp-to-jpg", options),
  webp_to_gif: (
    file,
    options = {
      source_format: "webp",
      ...optionsVars,
    }
  ) => ezgif(file, "webp-to-gif", options),
};
