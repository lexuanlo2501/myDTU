const mongoose = require('mongoose');

const chatRoom = mongoose.Schema({
    Users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Users',
            require:true
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'chatMessage'
        }
    ]
},{timestamps:true});

module.exports = mongoose.model('chatRoom',chatRoom);