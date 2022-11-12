const mongoose = require('mongoose');
const Class= new mongoose.Schema({
    content_type:{
        type:String,
        default:`Thông tin lớp học`
    },
    class_id:{
        type:String,
        required:true
    },
    signUpCode:{
        type:String,
        required:[true,'Mã đăng ký lớp học không được để trống']
    }, 
    group_id:{
        type: String,
        required:[true,'Lớp phải có mã chuyên ngành']
    },
    course_name:{
        type:String,
        required:[true,'Mã chuyên ngành  không được để trống']
    },
    course_id:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        required:[true,'Học kỳ không được để trống']
    },
    year:{
        type:String,
        required:[true,'Năm học không được để trống']
    },
    lecturer:[{
        full_name:{
            type:String,
            require:true
        },
        uid:{
            type:String,
            default:null,
            require:true
        }
    }],
    avaible_seats:{
        type:Number,
        min:0,
        required:true
    },
    remaining_seats:{
        type:Number,
        min:[0,'Số chỗ còn lại không được dưới 0'],
        default:this.avaible_seats,
        required:true
    },
    occupied_seats:{
        type:Number,
        min:0,
        max:this.avaible_seats
    }
    ,
    
    available:{
        type:Boolean,
        require:true,
        default:true
    },
    signUpTime:{
        
            start:{
                type:String,
                require:true
            },
            end:{
                type:String,
                require:true
            }
        
    },
    from_to:{
        
            starting_week:{
                type:String,
                require:true
            },
            ending_week:{
                type:String,
                require:true
            },
            starting_date:{
                type:String,
                require:true
            },
            ending_date:{
                type:String,
                require:true
            }
        
    },
    
    timeAndplace:[
        {
            week_day:{
                type:String,
                require:true
            },
            time:{
                type:String,
                require:true
            },
            place:{
                type:String,
                require:true
            }
        }
    ],
    cancel_weeks:[
        {
            week_day:{
                type:String,
                require:true
            },
            abort:{
                type:[Number],
                require:true
            }

        }
    ],
    class_status:{
        type:String,
        required:[true,'Trạng thái lớp học không được để trống'],
        default:'Lớp Học Chưa Bắt Đầu'
        
    }
    ,
    prerequisite_course:{
        type:[String],
       
    },
    parallel_subjects:{
        type:[String],
       
    },
    credits:{
        type:Number,
        required:true
    },
    class_type:[String],
    detailed_Schedule:[
        {
            week:{
                type:Number,
                require:true,

            },
            schedule:[
                {
                    week_day:{
                        type:String,
                        require:true,
                    },
                    time:{
                        type:String,
                        require:true
                    },
                    place:{
                        type:String,
                        require:true
                    },
                    date:{
                        type:String,
                        require:true
                    },
                    description:{
                        type:String,
                        default:""
                    }
                }
            ]
        }
    ]
   

});




module.exports = mongoose.model("Class",Class);