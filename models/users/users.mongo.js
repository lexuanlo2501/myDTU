const 
    mongoose = require('mongoose') ,
    Users = new mongoose.Schema({
    
    createdAt:{
        type:String,
        default: new Date().toLocaleString()
    },
    uid:{
        type:String,
        require:true
    },
    content_type:{
        type:String,
        default:"Người dùng"
    },
    full_name:{
        type:String,
        require:true
            },
    email:{
        type:String,
        require:true
    },
    phoneNumber:Number,
    password:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    date_of_birth:{
        type:String,
        require:true,
    },
    
    PlaceOfBirth:{
        type:String,
        require:true
    },
    first_time_signin:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        require:true
    },
    currentLivingArea:String,
    avt_src:{
        type:String,
        default:''
    }
});
    


module.exports = mongoose.model("User",Users);

