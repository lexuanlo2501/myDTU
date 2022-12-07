const mongoose = require('mongoose');
const UsersInClass = mongoose.Schema({
    class:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Class'
    },
    class_id:{
        type:String,
        require:true
    },
    year:{
        type:String,
        require:true
    }
    ,
    semester:{
        type:String,
        require:true
    }
    ,
    Students:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
]

});

module.exports = mongoose.model('Users_InClass',UsersInClass);