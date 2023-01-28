const mongoose = require('mongoose');

const WrittenExamQuestion = mongoose.Schema({
    questionType:{
        type:String,
        require:true,
        default:'4'
    },
    question:{
        type:String,
        require:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'
    }
});

module.exports = mongoose.model('written_exam_question',WrittenExamQuestion);