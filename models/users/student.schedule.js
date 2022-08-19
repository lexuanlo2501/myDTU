const mongoose = require('mongoose');
const Student_Schedule = new mongoose.Schema({
    content_type:{
        type:String,
        default:'Lịch học sinh viên',
    },
    _id:{
        type:Number,
        ref:'Users',
        required:true
    },
    full_name:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        default:''
    },
    year:{
        type:String,
        default:''
        
    },
    semester_Starting_Date:{type:String , default:"8/22/2022"},
    semester_Ending_Date:{type:String , default:"12/25/2022"},
    class_registered:{
        type:[Object]
    },

    User_Schedule:{
        type:[Object],
    },
    
total_credits:{
    type:Number,
    default:0,
    min:0,
    max:19

}

});

module.exports = mongoose.model('Student_Schedules',Student_Schedule);
