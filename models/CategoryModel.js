const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');


const categorySchema = new Schema({
    name: {type: String,uniqe: true,required:true },
    slug: {type: String, unique:true}
    

  });

  categorySchema.pre('validate',function(next){
    this.slug = slugify(this.name, {
        lower: true,
        strict : true
    });
    next();
})

    // compile our model
    const myCategoryModel = mongoose.model('Category', categorySchema);
    module.exports = myCategoryModel;