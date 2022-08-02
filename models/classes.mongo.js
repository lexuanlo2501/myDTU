const mongoose = require('mongoose');
const Class= new mongoose.Schema({
    content_type:{
        type:String,
        default:`Lớp ${this.class_name}`
    },
    _id:{ 
        type:String,
        required:[true,'Mã môn học không được để trống']
    },
    signUpCode:{
        type:String,
        required:[true,'Mã đăng ký lớp học không được để trống']
    },
    group_name:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'course-Group',
        required:[true,'Lớp phải có mã chuyên ngành']
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'course',
        required:[true,'Mã chuyên ngành  không được để trống']
    },
    class_name:{
        type:String,
        default:this._id
    },
    class_type:{
        type:[String],
        required:[true,'Hình thức giảng dạy không được để trống']
    },
    credits:{
        type:Number,
        required:[true,'Số tín chỉ không được để trống']
    },
    lecturer:{
        type:String,
        required:[true,'Tên giảng viên không được để trống']
    },
    remaining_seats:{
        type:Number,
        min:[0,'Số chỗ còn lại không được dưới 0'],
        required:[true,'Số chỗ còn lại không được để trống']
    },
    Student_Number:{
        type:Number,
        min:[0,'Sỹ số không được dưới 0'],
        default:0
    },
    available:{
        type:Boolean,
    },
    signUpTime:{
        type:String,
        required:[true,'Thời gian đăng ký không được để trống']
    },
    from_to:{
        type:Object,
        default:{
            starting_week:undefined,
            ending_week:undefined,
            starting_date:undefined,
            ending_date:undefined
        },
        required:[true,'Tuần học không được để trống']
    },
    Schedule:{
        type:[Object],
        required:[true,'Lịch học không được để trống']
     },
    prerequisite_course:{
        type:String,
       
    },
    parallel_subjects:{
        type:[String],
       
    },
    students_registered:{
        type:[Object],
        min:0
    },
    semester:{
        type:String,
        required:[true,'Học kỳ không được để trống']
    },
    year:{
        type:String,
        required:[true,'Năm học không được để trống']
    }

});
module.exports = mongoose.model("Class",Class);