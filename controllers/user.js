exports.signup = (req, res) => {
  console.log("req.body", req.body);
  const user = new Usewr(req.body);

  user.save((err, user)=> {
    if(err) {
      return res.satatus(400).json({
        error
      })
    }
      res.json({
        user,
      });
  });
};
