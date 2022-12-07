const mongoose = require('mongoose');

const studentTranscriptRecord = mongoose.Schema({
    student_id:{
        type:String,
        require:true
    },
    class_taken:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users_InClass'
    },
    scoreTypes:[
        {
            _id:false,
            description:{
                type:String,
                require:true
            },
            percentage:{
                type:Number,
                require:true
            },
            score_scaling:{
                type:Number,
                require:true
            },
            student_grade:{
                type:Number
            }
        }
    ]

});

module.exports = mongoose.model('studentTranscriptInClass',studentTranscriptRecord);