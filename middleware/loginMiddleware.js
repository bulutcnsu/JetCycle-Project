const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

module.exports = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  try {
    const user = await User.findOne({ email }).exec();

    if (user) {
      if (user.password[0] !== password) {
        req.flash("error", "Password is wrong, Try Again");
        return res.redirect("/login");
      } else {
        let userId = user._id.toString();
        req.session._id = userId;
        UserIN = req.session._id;
        console.log("User authenticated:", user, UserIN);
        next();
      }
    } 
  else{    
      console.log("User not authenticated");
      req.flash("error", "Your email is not exist");
      return res.redirect("/login");}
    
  } catch (error) {
    console.log("Error finding user:", error);
    console.log("User not authenticated");
    req.flash("error", "Error finding user");
    res.redirect("login");
  }
};
