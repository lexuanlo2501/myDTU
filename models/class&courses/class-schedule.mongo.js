const mongoose = require('mongoose');
const Schedule = new mongoose.Schema({
    content_type:{
        type:String,
        default:`Lịch học `
    },
    _id:{
        type:String,
        required:true
    },
    class_name:{
        type:String,
        required:[true, `Tên lớp không được để trống`]
    },
    semester:{
        type:String,
        required:[true,`Học kỳ không được để trống`]
    },
    year:{
        type:String,
        required:[true,`Năm học không được để trống`]
    },
    lecturer:{
        type:[String],
        required:[true,'Giảng viên không được để trống']
    },
    detailed_Schedule:{
        type:[Object],
        required:[true,`Lịch học không được để trống`]
    }

});

module.exports = mongoose.model('Schedule',Schedule);