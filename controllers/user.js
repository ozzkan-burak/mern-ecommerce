const User = require("../models/user");
const {errorHandlers} = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {

  const user = new User(req.body);

  user.save((err, user)=> {
    if(err) {
      return res.status(400).json({
        err: errorHandlers(err)
      })
    }
      res.json({
        user,
      });
  });
};
