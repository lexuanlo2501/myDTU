const mongoose = require('mongoose');

const course = new mongoose.Schema({
    _id:{
        type:String,
        required:[true,'Mã môn không được để trống']
    },
    group:{
        type:String,
        ref:'course-Group',
        required:true
    },
    course_name:{
        type:String,
        ref:'course-Group',
        required:[true,'Thiếu tên môn học']
    }
    ,
    course_credits:{
        type:Number,
        required:[true,"Số tín chỉ không được để trống"]
    },
    study_unit:{
        type:String,
        default:'Tín chỉ'
    },
    course_type:{
        type:[String],
        required:[true,'Loại hình lớp học không được để trống']
    }
    ,
    prerequisite_course:{
        type:[String],
        
    },
    parallel_subjects:{
        type:[String],
        
        
    },
    course_description:{
        type:String,
        default:""
    }
});

module.exports = mongoose.model('course',course);