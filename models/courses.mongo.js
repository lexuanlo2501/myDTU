const mongoose = require('mongoose');
const Course = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    course_name:{
        type:String,
        required:true
    },
    course_type:{
        type:[String],
        required:true
    },
    course_credits:{
        type:Number,
        required:true
    },
    lecturer:{
        type:String,
        required:true
    },
    remaining_seats:{
        type:Number,
        min:0,
        required:true
    },
    available:{
        type:Boolean,

    }


})