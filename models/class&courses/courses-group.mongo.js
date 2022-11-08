const mongoose = require('mongoose');

const courseGroup = new mongoose.Schema({
    content_type:{
        type:String,
        default:"Nhóm mã chuyên ngành"
    },
    group_id:{
        type:String,
        required:[true,"Bạn phải nhập mã chuyên ngành"]
    },
    courses:[Object]
});

module.exports = mongoose.model("course-Group",courseGroup);