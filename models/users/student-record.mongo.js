const mongoose = require('mongoose');

const Student_Record = new mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    full_name:{
        type:String,
        required:true
    },
    passed_courses:{
        type:[Object] 
        /*[{
          course:
          credits 
        }]}*/
        },
    study_record:{
        type:[Object]
        /**
         * {
         *  year:
         * semester_I:[{course,class,credits,score}]
         * semesster_II:[]
         * summer_semester:[]
        
         * }
         * 
         */
    }
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