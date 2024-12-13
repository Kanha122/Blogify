const mongoose = require("mongoose");
const config = require("config");
const { modifierNames } = require("chalk");
const dgbr = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/Blogify`)
  .then(() => {
    dgbr("connected");
  })
  .catch((err) => {
    console.log(err);
  });


  module.exports=mongoose.connection;