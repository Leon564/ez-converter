const formData = require("form-data");
const axios = require("axios");
const cheerio = require("cheerio");

const processFile = async (options) => {
  const data = new formData();
  const newUrl = options.newUrl;
  if (!newUrl) throw new Error("Error on process newUrl");
  const file = newUrl.substring(newUrl.lastIndexOf("/") + 1);
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

  const processOptions = await axios({
    method: "POST",
    url: newUrl,
    data: data,
    headers: data.getHeaders(), 
  });
  const cLoad = cheerio.load(processOptions.data);
  const output = cLoad("div#output").html();
  if (!output)
    throw new Error(processOptions.data.replace(new RegExp("<br />"), "\n"));
  const cOutput = cheerio.load(output);
  return cOutput("a[class=save]").attr("href");
};

module.exports = processFile;
