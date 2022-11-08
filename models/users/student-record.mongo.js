const mongoose = require('mongoose');

const Student_Record = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    student_id:{
        type:String,
        required:true
    },
    passed_courses:[{type:mongoose.Schema.Types.ObjectId,ref:'course'}] ,
    study_record:[
        {
            _id:false,
            year:{
                type:String,
                require:true
            },
            semester_I:[
        {
            _id:false,    
            class_id:{
                type:String,
                require:true
            },
            course_name: {
                type:String,
                require:true
            },
            course_id: {
                type:String,
                require:true
            },
            credits:{
                type:Number,
                require:true
            }
        }
            ],
            semesster_II:[
                {
                    _id:false,    
                    class_id:{
                        type:String,
                        require:true
                    },
                    course_name: {
                        type:String,
                        require:true
                    },
                    course_id: {
                        type:String,
                        require:true
                    },
                    credits:{
                        type:Number,
                        require:true
                    }
                }
            ],
            summer_semester:[
                {
                    _id:false,    
                    class_id:{
                        type:String,
                        require:true
                    },
                    course_name: {
                        type:String,
                        require:true
                    },
                    course_id: {
                        type:String,
                        require:true
                    },
                    credits:{
                        type:Number,
                        require:true
                    }
                }
            ]
        }
    ] 
    
,
    overall_credits:{
        type:Number,
        default:0,
        min:0
    },
    overall_score:{
        type:Number,
        default:0,
        min:0
    }
});

Student_Record.pre('save',function(){
    if(this.passed_courses.length!==0){
        this.total_credits = this.passed_courses.reduce((prev,next)=>prev.credits+next.credits);
    }
});

module.exports = mongoose.model('Student_Record',Student_Record);