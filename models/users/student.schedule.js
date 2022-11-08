const mongoose = require('mongoose');
const Student_Schedule = new mongoose.Schema({
    content_type:{
        type:String,
        default:'Lịch học sinh viên',
    },
    student_id:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        require:true,
        default:'Học Kỳ I'
    },
    year:{
        type:String,
        require:true,
        default:'Năm Học 2022-2023'
    },
    semester_Starting_Date:{
        type:String,
        default:'08/22/2022',
        required:true
    },
    semester_Ending_Date:{
        type:String,
        default:'12/25/2022',
        required:true
    }
    ,
    class_registered:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Class'
        }
    ],

    User_Schedule:[
        {
                week: {
                type:Number,
                require:true
                },
                week_schedule: [
            {
            week_day: {
                type:String,
                require:true
                },
            date: {
            type:String,
            require:true
          },
          day_schedule: [
            {
                _id:false,
                class_id: {
                    type:String,
                    require:true
                  },
                class_name: {
                    type:String,
                    require:true
                  },
                time: {
                    type:String,
                    require:true
                  },
                place: {
                    type:String,
                    require:true
                  },
                description: {
                    type:String,
                  }
              }
          ]
            }
            ],
        }],
    
total_credits:{
    type:Number,
    default:0,
    min:0,
    max:19

}

});

module.exports = mongoose.model('Student_Schedules',Student_Schedule);
