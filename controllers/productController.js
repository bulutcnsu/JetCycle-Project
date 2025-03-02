const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/ProductModel');
const Category = require('../models/CategoryModel');
const User = require('../models/UserModel');
const path = require('node:path');


exports.createProduct = async(req, res) => {

  const __dirname = path.resolve();
  let uploadImage = await req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadImage.name;
   console.log(" bana gelen foto : ",uploadImage);

   uploadImage.mv(uploadPath, async  () => {
    const product = new Product({
      name: req.body.name,
      color: req.body.color,
      description: req.body.description,
      price: req.body.price,
      size :req.body.size,
      category : req.body.category,
      image: '/uploads/' + uploadImage.name,
    });
  
    await product.save();
    console.log("product has been created succesfully");
  });


return res.status(201).redirect('/');

if(mongoose.Error) { 
  console.log("form dan gelen deger :", req.body);
  res.status(400).redirect('/');
 }
}

exports.getAllProducts =  async (req, res) => {
const user = await User.findOne({_id:req.session._id});
const allusers = await User.find();
const categories  = await Category.find();
const products = await  Product.find().populate("category");

let productsByCategory = {};
categories.forEach(category => {
  productsByCategory [category._id] = {
      categoryName: category.name,
     products: products.filter(product => product.category._id.equals(category._id))
  };
});
res.status(200).render('cycle', {
    page_name: 'cycle',
    user,
    allusers,
    categories,
    products,
    productsByCategory
  });
}


