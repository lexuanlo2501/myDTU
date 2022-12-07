const 
    mongoose = require('mongoose'),
    Student = new mongoose.Schema({
        student_id:{
            type:String,
            require:true
        },
        content_type:{
            type:String,
            default : "Thông tin sinh viên"
        },
        study_major:{
            type:String,
            required:[true,'Người dùng cần phải nhập ngành học của mình']
        },
        admission_Date:{
            type:String,
            default : new Date().toLocaleDateString()
        },
        education_type:{
            type:String,
            default: "Cử nhân"
        },
        academic_Year:{
            type:String,
            default:`K${new Date().getFullYear() - 1994}`
        }
        ,
        academic_Advisor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'lecturer'
        },
        activity_class:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'activityClass'
        }

    });

module.exports = mongoose.model('Student',Student);