const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
require("dotenv").config();
// routes
const userRoutes = require("./routes/user");

// app
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err)=> console.log(err));


// routes middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server runing on port: ${port}`);
});
