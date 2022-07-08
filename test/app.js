const express = require("express");
const app = express();
const { default: scrawny } = require("../index.js");

app.use(
  scrawny({
    log: true,
    format: "[DATE] [STATUS]",
    dateFormat: "lol",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(16000, () => {
  console.log("Listening on port 16000");
});
