const mongoose = require('mongoose');

const chatMessage = mongoose.Schema({
    
    sender:{
        _id:false,
        sender_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            require:true
        },
        sender_uid:{
            type:String,
            require:true
        },
        sender_fullName:{
            type:String,
            require:true
        }
    },
    message:{
        type:String,
        require:true
    },
    isRead:{
        type:Boolean,
        default:false
    }
    
},{timestamps:true});

module.exports = mongoose.model('chatMessage',chatMessage);