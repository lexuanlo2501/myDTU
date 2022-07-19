const mongoose = require('mongoose');
    
const Users = new mongoose.Schema({
            _id:{
                type:Number,
                required:true
            },
            full_name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            password:{
                type:String,
                required:true
            },
            gender:{
                type:String,
                required:true
            },
          



        });
    
      

module.exports = mongoose.model("Users",Users);

