const express = require("express");
const router = express.Router();

// controllers
const { signup } = require("../controllers/user");
const { userSignupValidator } = require("../validator");

router.post("/signup", userSignupValidator, signup);

module.exports = router;
