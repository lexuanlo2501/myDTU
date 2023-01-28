const mongoose = require('mongoose');

const YesNoQuestion = mongoose.Schema({
    questionType:{
        type:String,
        require:true,
        default:'1'
    }
    ,question:{
        type:String,
        require:true
    },
    values:{
        type:[String],
        require:true,
        default:['true','false']
    },
    correct:{
        type:String,
        require:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'
    }
});

module.exports = mongoose.model('yes_no_question',YesNoQuestion);