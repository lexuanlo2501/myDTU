const mongoose = require('mongoose');

const classAcademicTranscript = mongoose.Schema({
    classData:{
        _id:false,
        class:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Class',
        require:true
    },
        course_name:{
            type:String,
            require:true
        }

},
    submitBy:{
        _id:false,
        lecturer:{
            _id:{
                type:mongoose.Schema.Types.ObjectId,
                require:true
            },
            full_name:{
                type:String,
                require:true
            },
            uid:{
                type:String,
                require:true
            }
        }
    },
    semester:{
        type:String,
        require:true
    },
    year:{
        type:String,
        require:true
    },
    scoreTypes:[{
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
        }
    }],
    isReviewedByAdmin:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        default:"Pending"
    }
})

module.exports = mongoose.model('classAcademicTranscript',classAcademicTranscript); 