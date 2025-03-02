const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const app = express();


exports.getAboutPage = (req, res) =>{
    res.render('about');
  };

 

  module.exports = router;