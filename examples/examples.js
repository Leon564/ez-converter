const fs = require("fs");
const ez = require("../src/index");

//Convert Video to GIF from local file
ez.video_to_gif("example/example.mp4", {//the propietes start and end are optional, if not specified, the default value for start is 0 and the default value for end is 100 seconds
  source_format: "mp4",
  start: 0,
  end: 10,
})
  .then((file) => {
    
    fs.writeFileSync("example/example.gif", file); //write the file to the local disk, the file is a buffer
  })
  .catch((err) => {
    console.log(err);
  });

//convert Gif to Webp from url
ez.gif_to_mp4("https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif", {
  source_format: "gif",
  start: 0,
  end: 10,
})
  .then((file) => {
    fs.writeFileSync("example/example.webp", file);
  })
  .catch((err) => {
    console.log(err);
  });

//conver webp to mp4 from buffer
ez.webp_to_mp4(fs.readFileSync("example/example.webp"), {
  source_format: "webp",
  start: 0,
  end: 10,
})
  .then((file) => {
    fs.writeFileSync("example/example.mp4", file);
  })
  .catch((err) => {
    console.log(err);
  });
