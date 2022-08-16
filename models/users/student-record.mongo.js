const mongoose = require('mongoose');

const StudentRecord = new mongoose.Schema({
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
        /*
        
        {
            year:
            semester_I:[{
                course:
                credits:
                status:
                final_score:
            }]
            semester_II:[{
                course:
                credits:
                status:
                final_score
            }]
            summer_semester:[{
                course:
                credits:
                status:
                final_score:
            }]
            total_credits:
        
        }
        
        */
        
    },
    failed_courses:{
        type:[Object]
        /*
        
        {
            year:
            semester_I:[{
                course:
                credits:
                status:
                final_score: // String
            }]
            semester_II:[{
                course:
                credits:
                status:
                final_score
            }]
            summer_semester:[{
                course:
                credits:
                status:
                final_score:
            }]
        
        }
        
        */
    },
    restudy_courses:{
        type:[Object]
        /*
        
        {
            year:
            semester_I:[{
                course:
                credits:
                status:
                final_score: //String
            }]
            semester_II:[{
                course:
                credits:
                status:
                final_score
            }]
            summer_semester:[{
                course:
                credits:
                status:
                final_score: // String
            }]
        
        }
        
        */
    },
    total_credits:{
        type:Number,
        default:0,
        min:0
    }
});

StudentRecord.pre('save',function(){
    if(this.passed_courses.length!==0){
        this.total_credits = this.passed_courses.reduce((prev,next)=>prev.total_credits+next.total_credits);
    }
});

module.exports = mongoose.model('StudentRecord',StudentRecord);