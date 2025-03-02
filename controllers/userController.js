const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('../models/UserModel');


exports.loginUser = async (req, res) => {
 
  res.status(200).redirect('/');

}

exports.registerUser =  async (req, res) => {
  
    try{
      const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password[0],
        role: req.body.role,
        createdAt: Date.now,
        
    });
    
    await user.save();
    return res.status(201).redirect('/');
  }
  
  catch (err) { req.flash("error", "Error Happend ",err.status);;}}
  
exports.logoutUser = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.send('Error destroying session');
        } else {
            console.log('Session destroyed'),
            res.redirect('/login');
        }
    });
}

exports.deleteUser = async (req, res) => {
  try {    
    await User.findOneAndDelete({_id: req.params.id })
   .then(function(){
    console.log("deleted user", req.params.id); })// Success})
    res.status(200).redirect('/products/cycle');
 } catch (error) {
   res.status(400).json({
     status: 'fail',
     error,
   });
   console.log(error);
}}

exports.getShoppingPage = (req, res) =>{
  res.render('shopping');
};
