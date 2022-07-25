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
            date_of_birth:{
                type:Date,
                required:true
            },
            PlaceOfBirth:{
                type:String,
                required:true
            },
            study_major:{
                type:String,
                required:true
            },
            first_time_signin:{
                type:Boolean,
                default:true
            },
            role:{
                type:String,
                default:'Sinh viên'
            },
            



        });
    
      

module.exports = mongoose.model("Users",Users);

