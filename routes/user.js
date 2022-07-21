const express = require("express");
const router = express.Router();

// controllers
const {
  signup,
  signin,
  signuot,
  requireSignin,
} = require("../controllers/user");
const { userSignupValidator } = require("../validator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signuot", signuot);

router.get("/hello", requireSignin, (req, res) => {
  res.send("selam millet");
});

module.exports = router;
