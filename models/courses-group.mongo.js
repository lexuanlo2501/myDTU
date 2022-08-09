const mongoose = require('mongoose');

const courseGroup = new mongoose.Schema({
    content_type:{
        type:String,
        default:"Nhóm mã chuyên ngành"
    },
    _id:{
        type:String,
        required:[true,"Bạn phải nhập mã chuyên ngành"]
    },
    group_name:{
        type:String,
        default:this._id,
        required:[true,'Thiếu tên nhóm ngành']
    },
    courses:[{type:String,ref:'course'}]
});

module.exports = mongoose.model("course-Group",courseGroup);