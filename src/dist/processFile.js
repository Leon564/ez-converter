let formData = require("form-data");
let axios = require("axios");
let cheerio = require("cheerio");

const processFile = async (options) => {
  let data = new formData();
  let newUrl = options.newUrl;
  if (!newUrl) throw new Error("Error on process newUrl");
  let file = newUrl.substring(newUrl.lastIndexOf("/") + 1);
  data.append("file", file);
  data.append("start", options.startTime);
  data.append("end", options.endTime);
  data.append("percentage", options.quality);
  data.append("background", options.background);
  data.append("size", options.size);
  data.append("fps", options.fps);
  data.append("method", options.method);
  data.append("diff", options.diff.toString());
  data.append("loop", options.loop.toString());

  let processOptions = await axios({
    method: "POST",
    url: newUrl,
    data: data,
    headers: data.getHeaders(),
  });
  let cLoad = cheerio.load(processOptions.data);
  let output = cLoad("div#output").html();
  if (!output)
    throw new Error(processOptions.data.replace(new RegExp("<br />"), "\n"));
  let cOutput = cheerio.load(output);
  return cOutput("a[class=save]").attr("href");
};

module.exports = processFile;
