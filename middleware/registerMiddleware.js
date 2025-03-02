const express = require("express");
const router = express.Router();
const session = require("express-session");
const flash = require("connect-flash");
const { body } = require("express-validator");
const User = require("../models/UserModel");

module.exports = async (req, res, next) => {
  const { username, password,email } = req.body;
  const user = await User.findOne({email});
 
   if(username =='' || email =='' || password[0] =='' || password[1]=='') 
    { req.flash("error", "All fields must have fill-in"); return res.redirect("/register");}

   else if(!email.includes('@') || !email.includes('.com')) 
    { req.flash("error", "Email must contain @ and .com "); return res.redirect("/register");}
  
   else if(user) {req.flash("error", "User already Exist !");return res.redirect("/register");}
 
  else if(password[0] !== password[1]) {
    req.flash("error", "Passwords Are Not Matched, Try Again");return res.redirect("/register");} 
  
  else{ 
    
  console.log('exited  middleware ');
    
  next(); }}
