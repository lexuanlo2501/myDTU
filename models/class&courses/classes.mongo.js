const mongoose = require('mongoose');
const Class= new mongoose.Schema({
    content_type:{
        type:String,
        default:`Thông tin lớp học`
    },
    _id:{ 
        type:String,
        required:[true,'Mã môn học không được để trống']
    },
    signUpCode:{
        type:String,
        required:[true,'Mã đăng ký lớp học không được để trống']
    }, 
    group_name:{
        type: String,
        ref:'course-Group',
        required:[true,'Lớp phải có mã chuyên ngành']
    },
    course:{
        type: String,
        ref:'course',
        required:[true,'Mã chuyên ngành  không được để trống']
    },
    class_name:{
        type:String,
        required:true
    },
    class_type:{
        type:[String],
        required:[true,'Hình thức giảng dạy không được để trống']
    },
    credits:{
        type:Number,
        required:[true,'Số tín chỉ không được để trống']
    },
    semester:{
        type:String,
        required:[true,'Học kỳ không được để trống']
    },
    year:{
        type:String,
        required:[true,'Năm học không được để trống']
    },
    lecturer:{
        type:[String],
        required:[true,'Tên giảng viên không được để trống']
    },
    remaining_seats:{
        type:Number,
        min:[0,'Số chỗ còn lại không được dưới 0'],
        required:[true,'Số chỗ còn lại không được để trống']
    },
    avaible_seats:{
        type:Number,
        min:0,
        required:true
    },
    occupied_seats:{
        type:Number,
        min:0,
    }
    ,
    Student_Number:{
        type:Number,
        default:this.occupied_seats
    },
    available:{
        type:Boolean,
        default:true
    },
    signUpTime:{
        type:Object,
        default:{
            start:'',
            end:''
        },
        required:[true,'Thời gian đăng ký không được để trống']
    },
    from_to:{
        type:Object,
        default:{
            starting_week:undefined,
            ending_week:undefined,
            starting_date:undefined,
            ending_date:undefined
        },
        required:[true,'Thời gian học không được để trống']
    },
    
    timeAndplace:{
        type:[Object],
        required:true
    },
    cancel_weeks:{
        type:[Object],
        required:true
    },
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
   

});


Class.pre('update',function (){
    
   if(this.avaible_seats===0 ) this.available= false;
   
});



module.exports = mongoose.model("Class",Class);