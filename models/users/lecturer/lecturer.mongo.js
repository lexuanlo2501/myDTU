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
        subjects:[Object]

    });

module.exports = mongoose.model('lecturer',Lecturer);