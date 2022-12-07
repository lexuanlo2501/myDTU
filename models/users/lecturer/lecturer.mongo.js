const 
    mongoose = require('mongoose'),
    Lecturer = new mongoose.Schema({
        lecturer_id:{
            type:String,
            require:true
        },
        degree:{
            type:String,
            require:true
        },
        department:{
            type:String,
            require:true
        },
        Academic_Section:{
            type:String,
            require:true
        },
        lecturing_form:{
            type:String,
            require:true
        },
        subjects:[Object],
        vocational_classes:[
            {
                type:mongoose.Schema.Types.ObjectId,
                require:true
            }
        ]

    });

module.exports = mongoose.model('lecturer',Lecturer);