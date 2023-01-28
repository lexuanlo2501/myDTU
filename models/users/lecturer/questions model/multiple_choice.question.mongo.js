const  mongoose = require('mongoose');

const MultipleChoiceQuestion = mongoose.Schema({
    question_type:{
        type:String,
        require:true,
        default:'2'
    },
    question:{
        type:String,
        require:true
    },
    answers:{
        "1":{
            type:String,
            require:true
        },
        "2":{
            type:String,
            require:true
        },
        "3":{
            type:String,
            require:true
        },
        "4":{
            type:String,
            require:true
        },
    },
    correct:{
        type:String,
        require:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    }
});

module.exports = mongoose.model('multiple_choice_question',MultipleChoiceQuestion);