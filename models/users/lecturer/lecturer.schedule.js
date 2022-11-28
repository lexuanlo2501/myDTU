const mongoose = require('mongoose');
const lecturerSchedule = new mongoose.Schema({
    content_type:{
        type:String,
        default:"Lịch giảng dạy giảng viên"
    },
    lecturer_id:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        require:true,
        default:'Học Kỳ I'
    },
    year:{
        type:String,
        require:true,
        default:`Năm Học ${new Date().getFullYear()}-${new Date().getFullYear()+1}`
    },
    semester_Starting_Date:{
        type:String,
        default:`08/22/${new Date().getFullYear()}`,
        required:true
    },
    semester_Ending_Date:{
        type:String,
        default:`12/25/${new Date().getFullYear()}`,
        required:true
    }
    ,
    class_registered:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Class'
        }
    ],

    Lecturer_Schedule:[Object]
});

module.exports = mongoose.model('lecturer_schedule',lecturerSchedule);