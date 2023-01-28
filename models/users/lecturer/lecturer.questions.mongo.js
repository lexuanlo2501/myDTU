const mongoose = require('mongoose');

const QuestionVault = new mongoose.Schema({
    vault_name:{
        type:String,
        require:true
    },
    course_name:{
        type:String,
        require:true
    },
    questions:{
        _id:false,
        multiple_choices:[Object],
        yes_no_questions:[Object],
        shortAnswers:[Object],
        written_exams:[Object]
    },
    submit_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports = mongoose.model('question_vault',QuestionVault);