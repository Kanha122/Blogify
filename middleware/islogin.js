const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


module.exports.isLoggedIn = async function (req, res, next){
  const token = req.cookies.token;

  if (!token){
    
      return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await userModel.findOne({ email: decoded.email });
    req.user = user;
     return next();

  } catch(err){
     return next();
  }
};


