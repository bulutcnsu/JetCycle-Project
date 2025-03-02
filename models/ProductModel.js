const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./CategoryModel');
const productSchema = new Schema({
  
    name: {type: String, uniqe: true, required:true },
    description :{type: String },
    price: {type: Number, required: true},
    color:{type:String, required: true},
    size: {type:Number, required:true}, 
    image: {type: String },
    category:{type: mongoose.Schema.Types.ObjectId, ref:Category},
   
  });


  productSchema.pre('save', function(next) {
    
    next();
  });

  const myProductModel = mongoose.model('Product', productSchema);
    module.exports = myProductModel;