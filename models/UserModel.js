const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const userSchema = new Schema({
    name: {type: String,uniqe: true,required:true },
    email: {type: String, uniqe: true,required:true },
    password: [{  type: String , required:true }],
    role:{type: String,enum:["Admin",  "Customer", "Seller"],default: "Customer"},
    basket:[{type: mongoose.Schema.Types.ObjectId, ref:'ProductModel'}]

  });

  userSchema.pre('save', function(next) {
   
    next();
  });
    // compile our model
    const myUserModel = mongoose.model('User', userSchema);
    module.exports = myUserModel;
  
 // userSchema.pre("save", function(next){
 // hashing
   // return next();
//  });

  /*(!this.isModified("password")) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next()
    next();*/

