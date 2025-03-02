const express = require("express");
const router = express.Router();
const session = require("express-session");
const { body } = require("express-validator");
const User = require("../models/UserModel");

module.exports = async (req, res, next) => {
    
        const user = User.findOne({id:req.session._id}).exec();
        if(user.role == 'Customer' || 'Admin'){
            next();
        }
        else{
            return res.status(401).send('YOU CANT DO IT');
  }
}