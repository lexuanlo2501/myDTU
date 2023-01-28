const mongoose = require('mongoose');

const ScoreBoard = mongoose.Schema({
    class:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Class'
    },
    StudentScoresRecord:[
        {
            _id:false,
            uid:{
                type:String,
                require:true
            },
            full_name:{
                type:String,
                require:true
            },
            email:{
                type:String,
                require:true
            },
            date_of_birth:{
                type:String,
                require:true
            },
            ScoresRecord:[]
        }
    ],
    editable:{
        type:Boolean,
        require:true,
        default:true
    }
});

module.exports  = mongoose.model('scoreBoard',ScoreBoard);