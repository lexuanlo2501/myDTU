const mongoose = require('mongoose');

const VocationalClass =  mongoose.Schema({
    class_id:{
        type:String,
        require:true
    },
    managedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'lecturer',
        require:true
    },
    Students:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Student',
            require:true
        }
    ]

});

module.exports = mongoose.model('vocationalClass',VocationalClass);