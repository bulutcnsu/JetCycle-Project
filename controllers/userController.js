const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('../models/UserModel');
const Product = require('../models/ProductModel');


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

exports.getBasket = (req, res) =>{

  if (!req.session.basket) req.session.basket = [];
  
  res.render('shopping', 
    { basket: req.session.basket} );
};

 exports.addToBasket = async (req, res) =>{
  try {
   const product = await Product.findOne({ _id: req.params.id });

     if (!req.session.basket) req.session.basket = [];

     const existingItem = req.session.basket.find(item => item._id.toString() === req.params.id);

     if (existingItem) {
      existingItem.quantity += 1; // Eğer ürün zaten varsa, sayısını artır
     } else {
       product.quantity = 1;
       req.session.basket.push(product); //
     }

  console.log('Product added :' ,req.session.basket);
 res.status(200).render('shopping',{ basket: req.session.basket },)

} catch (error) {
  res.status(500).json({ message: "Hata oluştu", error });
}

};

exports.deleteBasket = async(req, res) => { 
  try {
    console.log(" session basket: ",req.session.basket)
    if (!req.session.basket) req.session.basket = [];
    const index = req.session.basket.findIndex(item => item._id.toString() === req.params.id);


  if (index !== -1) {
    req.session.basket.splice(index, 1);
    req.session.save(); }
  
    res.status(200).redirect('/users/shopping');
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
}

exports.decreaseBasket= async(req, res) => { 
  try {
 
    const product = await Product.findOne({ _id: req.params.id });
    const existingItem = req.session.basket.find(item => item._id.toString() === req.params.id);
     
    if(existingItem.quantity > 1 ){
      existingItem.quantity --;
    }
   
    res.status(200).redirect('/users/shopping');
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
}

