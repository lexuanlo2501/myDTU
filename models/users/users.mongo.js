const mongoose = require('mongoose');
    
const Users = new mongoose.Schema({
    uid:{
        type:String,
        required:[true,'Người dùng phải có mã định danh']
    },
    content_type:{
        type:String,
        default:"Người dùng"
    },
    full_name:{
                type:String,
                required:[true,'Người dùng phải có họ tên đầy đủ']
            },
            email:{
                type:String,
                required:[true,'Người dùng phải có email liên lạc']
            },
            phoneNumber:Number,
            password:{
                type:String,
                required:[true,'Người dùng phải có mật khẩu đăng nhập']
            },
            gender:{
                type:String,
                required:[true,'Yêu cầu nhập giới tính']
            },
            date_of_birth:{
                type:String,
                required:[true,'Thiếu ngày tháng năm sinh']
            },
            
            PlaceOfBirth:{
                type:String,
                required:[true,'Cần phải có quê quán']
            },
            study_major:{
                type:String,
                required:[true,'Người dùng cần phải nhập ngành học của mình']
            },
            department:{
                type:String,
                
            }
            ,
            first_time_signin:{
                type:Boolean,
                default:true
            },
            role:{
                type:String,
                require:true
            },
            currentLivingArea:String,
             
        });
    
      

module.exports = mongoose.model("User",Users);

