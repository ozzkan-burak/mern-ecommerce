const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// app
const app = express();

//db
mongoose.connect(proceü.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreteIndex: true,
});

// routes
app.get("/", (req, res) => {
  res.send("hello from node");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server runing on port: ${port}`);
});
