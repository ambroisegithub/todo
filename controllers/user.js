const User = require("../models/user");
const { validationResult } = require("express-validator");
const user = require("../models/user");
var jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
exports.signup = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
          return res.status(400).json({
              error:errors.array()[0].msg
          })
      }

  const userNew = await user.findOne({ email: req.body.email });
  if (userNew) {
    return res.status(400).json({
      message: "email has been taken",
    });
  }

  const newUser = await user.create(req.body);

  const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
    expiresIn: "2h",
  });


  return res.json({
    message: "success",
    token,
    newUser,
  });
};


exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email Not Found",
      });
    }
    //athenticate

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and Password Do Not Match",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "4h",
    });

    const { _id, name, email } = user;
    return res.json({
      token,
      user: {
        _id,
        name,
        email,
      },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  return res.json({
    message: "USer Signout successful",
  });
};
