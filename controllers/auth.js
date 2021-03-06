const User = require("../models/user");
const {errorHandler} = require("../helpers/dbErrorHandler");
const jwt = require("jsonwebtoken");
var { expressjwt } = require("express-jwt");

exports.signup = (req, res) => {

  const user = new User(req.body);

  user.save((err, user)=> {
    if(err) {
      return res.status(400).json({
        err: errorHandler(err)
      })
    }
      user.salt = undefined;
      user.hashed_password = undefined;
      res.json({
        user,
      });
  });
};

exports.signin = (req, res) => {
  // find the user based on email
  const {email, password} = req.body;
  User.findOne({email}, (err, user)=>{
    if(err||!user){
      return res.status(400).json({
        err: "User with that email does not exist. Please signup"
      })
    }
    if(!user.authenticate(password)){
      return res.status(401).json({
        error: "Email and password dont match"
      });
    }
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    res.cookie('t', token, {expire: new Date() + 9999});
    const {_id, name, email, role} = user;
    return res.json({token, user: {_id, email, name,role}});
  });
} 

exports.signuot = (req, res) => {
  res.clearCookie('t');
  res.json({message: 'Signout success'});
};

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});