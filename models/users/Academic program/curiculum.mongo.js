const mongoose = require('mongoose');

const Curriculum = new mongoose.Schema({
    major:{
        type:String,
        require:true
    },
    education_type:{
        type:String,
        require:true
    },
    general_Subjects:[
        {
        _id:false,
        course_type:{
            type:String,
            require:true
        },
        description:{
            type:String,
            require:true,
            default:""
        },
        subjects:[{
            _id:false,
            course_id:{
                type:String,
                require:true
            },
            course_name:{
                type:String,
                require:true
            },
            credits:Number,
            status:{type:String,default:""}
        }]
    }
],
    physical_Subjects:[
        {
            _id:false,
            course_type:{
                type:String,
                require:true
            },
            description:{
                type:String,
                require:true,
                default:""
            },
            subjects:[{
                _id:false,
                course_id:{
                    type:String,
                    require:true
                },
                course_name:{
                    type:String,
                    require:true
                },
                credits:Number,
                status:{type:String , default:""}
            }]
        }
],
    core_Subjects:[
        {
            _id:false,
            course_type:{
                type:String,
                require:true
            },
            description:{
                type:String,
                require:true,
                default:""
            },
            subjects:[{
                _id:false,
                course_id:{
                    type:String,
                    require:true
                },
                course_name:{
                    type:String,
                    require:true
                },
                credits:Number,
                status:{type:String,default:""}
            }]
        }
],
    concentrated_Subjects:[
        {
            _id:false,
            course_type:{
                type:String,
                require:true
            },
            description:{
                type:String,
                require:true,
                default:""
            },
            subjects:[{
                _id:false,
                course_id:{
                    type:String,
                    require:true
                },
                course_name:{
                    type:String,
                    require:true
                },
                credits:Number,
                status:{type:String,default:""}
            }]
        }
]
});

module.exports = mongoose.model('Curriculum',Curriculum);