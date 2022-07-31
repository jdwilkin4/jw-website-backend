require("dotenv").config();
const contentful = require("contentful");
const express = require("express");
const port = process.env.PORT || 8000;
const app = express();
const cors = require("cors");
let mediaArr = [];
let blogPostsArr = [];

const client = contentful.createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
});

client.getEntries({ content_type: "media" }).then((entries) => {
  entries.items.forEach((entry) => {
    mediaArr.push(entry.fields);
  });
});

client.getEntries({ content_type: "blogPosts" }).then((entries) => {
  entries.items.forEach((entry) => {
    blogPostsArr.push(entry.fields);
  });
});

app.use(cors());

app.get("/api/media", (req, res) => {
  res.json(mediaArr);
});

app.get("/api/posts", (req, res) => {
  res.json(blogPostsArr);
});

app.listen(port, () => {
  console.log(`Server has started at port ${port}`);
});
