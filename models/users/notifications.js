const mongoose = require('mongoose');

const notifications = new mongoose.Schema({
    sender:{
        
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            require:true
        }
        
    ,
    receiver:{
    
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    
},
    Type:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    isRead:{
        type:Boolean,
        require:true,
        default:false
    },
    createdAt:{
        type:Date,
        require:true,
        default: Date()
    }
        
});

module.exports = mongoose.model('Notifications',notifications);