const mongoose = require('mongoose');
const UsersInClass = mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Class'
    },
    class_name:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        required:[true,'Học kỳ không được để trống']
    },
    year:{
        type:String,
        required:[true,'Năm học không được để trống']
    },
    lecturer:{
        type:[String],
        required:[true,'Tên giảng viên không được để trống']
    },
    
    Student_Number:{
        type:Number,
        default:0

    },
    class_status:{
        type:String,
        required:[true,'Trạng thái lớp học không được để trống'],
        default:'Lớp Học Chưa Bắt Đầu'
        
    },
    Students:{
        type:[mongoose.Schema.Types.ObjectId]
    }

});
UsersInClass.pre('save',function(){
    this.Student_Number = this.Students.length;
});
module.exports = mongoose.model('UsersInClass',UsersInClass);