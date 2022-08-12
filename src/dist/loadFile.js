import formData from "form-data";
import { load } from "cheerio";
import axios from "axios";
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
  const $ = load(result.data);
  const newUrl = $("form").attr("action");
  return newUrl.includes(".com") ? newUrl : baseUrl + newUrl;
};

export default loadFile;
