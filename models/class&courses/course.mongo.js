const mongoose = require('mongoose');

const course = new mongoose.Schema({
    course_id:{
        type:String,
        required:[true,'Mã môn không được để trống']
    },
    course_name:{
        type:String,
        required:true
    }
    ,
    group_name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'course-Group',
        required:true
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