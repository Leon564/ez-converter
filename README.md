# EZGIF-CONVERTER




# Content (Examples)

```js
const { Convert, Formats, sizes } = require("../src");

//The input can be a file path, buffer or a url

//convert mp4 to gif and save it to a file

await new Convert("file.mp4") //input
  .setDiff("off") //Optimize for static background (assign more colors to moving parts of the image)
  .setLoop("on") //Loop the video
  .setFps(10) //Set the frames per second
  .setStartTime(0) //Set the start time
  .setEndTime(10) //Set the end time
  .setquality(100) //Set the quality
  .setBackground("#ffffff") //Set the background
  .setSize(sizes.P500XAUTO) //Set the size of the output
  .setTargetFormat(Formats.GIF) //Set the target format
  .toFile("fileConverted.gif"); //Set the output file

//convert mp4 to webp buffer
let convert = await new Convert("video.mp4")
  .setTargetFormat(Formats.WEBP)
  .setEndTime(10)
  .setDiff("off")
  .setLoop("on")
  .setFps(10)
  .setSize(sizes.P500XAUTO)
  .toBuffer();
  
```

***

