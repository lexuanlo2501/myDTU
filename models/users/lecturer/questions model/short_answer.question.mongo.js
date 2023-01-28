const mongoose = require('mongoose');

const ShortAnswersQuestion = mongoose.Schema({
    questionType:{
        type:String,
        require:true,
        default:'3'
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

module.exports = mongoose.model('short_answers_question',ShortAnswersQuestion);

