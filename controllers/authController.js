const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const  { generateToken } = require("../utils/generatetoken");

module.exports.registeredUser = async function (req, res) {
  let { fullName, email, password } = req.body;
  try {

    let user = await userModel.findOne({ email });

    if (user) {

      return res.render("signin", {error:"Already Have an Account"});
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        let user = await userModel.create({
          fullName,
          email,
          password: hash,
        });

        let token = generateToken(user);
        res.cookie("token", token);
        return res.redirect("/");
      });
    });
  } catch (err) {
    return res.render("signin", {error:"Incorrect Email or Password"});
  }
};

module.exports.loginUser = async function (req, res) {
  let { email, password } = req.body;
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) {
      return res.render("signup", {error:"User Not Registered"});
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        return res.redirect("/");
      }else{
        return res.render("signin",{error:"Incorrect Email Or Password"});
      }
    });
  } catch (err) {
    return res.render("signup",{error:"Something Went Wrong"});
  }
};

module.exports.logout = function (req, res) {
  res.cookie("token", "");
  return res.redirect("/");
};

