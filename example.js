const fs = require("fs");
const ez = require("./index");

ez.webp_to_jpg(fs.readFileSync("./image.webp"))
  .then(function (image) {
    fs.writeFileSync("./image.jpg", image);
  })
  .catch((err) => console.log(err));

//OR

ez.webp_to_jpg("./image.webp")
  .then(function (image) {
    fs.writeFileSync("./image.jpg", image);
  })
  .catch((err) => console.log(err));
