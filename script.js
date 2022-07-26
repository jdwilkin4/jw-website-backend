require("dotenv").config();
const contentful = require("contentful");
const express = require("express");
const port = process.env.PORT || 8000;
const app = express();
const cors = require("cors");
let mediaArr = [];
const client = contentful.createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
});

client.getEntries({ content_type: "media" }).then((entries) => {
  entries.items.forEach((entry) => {
    mediaArr.push(entry.fields);
  });
});

app.get("/api/media", (req, res) => {
  res.json(mediaArr);
});

app.use(cors({ "Access-Control-Allow-Origin": "*" }));

app.listen(port, () => {
  console.log(`Server has started at port ${port}`);
});
