const mongoose = require('mongoose');

const UserNotification = mongoose.Schema({
    uid:{
        type:String,
        require:true
    },
    Notifications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Notifications',
            require:true
        }
    ]
});

module.exports = mongoose.model('UserNotification',UserNotification);