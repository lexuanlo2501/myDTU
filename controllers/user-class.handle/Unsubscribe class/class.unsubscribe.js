const 
    Student_Record = require('../../../models/users/Student/student-record.mongo'),
    Class = require('../../../models/class&courses/classes.mongo'),
    Student_Schedule = require('../../../models/users/Student/student.schedule'),
    RemoveFromSchedule = require('./schedule.removeClass'),
    Users_inClass = require('../../../models/class&courses/class-users');
    

async function UnsubscribeClass(class_id,user_id){
    /**
     * *Hàm xử lý hủy đăng ký môn của sinh viên 
     * @param class_id : Mã lớp
     * @param user_id : Mã người dùng (ObjectId trong database)
     */

    //*Lấy dữ liệu từ database 
    let [student_record,student_schedule,userInClass] = await Promise.all(
    [ 
        Student_Record.findOne({_id:user_id}).lean(),
        Student_Schedule.findOne({_id:user_id}).lean(),
        Users_inClass.findOne({class_id}).lean()
    ]),
        {study_record} = student_record  ||  {} ,
        {Students} = userInClass || {},
        {semester,year,class_registered,
        User_Schedule,total_credits} = student_schedule || {},
        {_id="",remaining_seats,occupied_seats,available,credits,detailed_Schedule} = await Class.findOne({class_id,semester,year}).lean() || {},
        UserRecord = study_record.find(data=>data.year.includes(year));
    
        
    const isEmptyClass = _id.toString().length===0,
        noRegisteredClass = class_registered.length === 0 ,
        isRegisteredClass = class_registered.find(id=>id && 
        id.toString().includes(_id.toString()))? true : false;

    //*Xử lý ngoại lệ để trả ra thông báo lỗi 
    switch(true){
    
    case (isEmptyClass):
        throw `Không tìm thấy thông tin lớp ${class_id} theo yêu cầu`;

    case (noRegisteredClass):
        throw 'Bạn không có môn nào để hủy đăng ký';

    case (!isRegisteredClass):
        throw 'Môn này không có trong danh sách các môn đã đăng ký'         
    
    }

    //*Lọc lớp hủy đăng ký này ra khỏi danh sách các lớp đã đăng ký & giảm số tín chỉ đã đăng ký trong học kỳ         
    class_registered = class_registered.filter(
        id=>id &&!id.toString().includes(_id.toString()) 
    );
    total_credits -= credits;
    
    if(UserRecord) switch(true){
        
        case (semester.includes('Học Kỳ I')):
            UserRecord.semester_I =  UserRecord.semester_I
            .filter(data=>!data.class_id.includes(class_id));
        break;

        case (semester.includes('Học Kỳ II')):
            UserRecord.semester_II =  UserRecord.semester_II
            .filter(data=>!data.class_id.includes(class_id));
        break;

        case (semester.includes('Học Kỳ Hè')):
            UserRecord.summer_semester =  UserRecord.summer_semester
            .filter(data=>!data.class_id.includes(class_id));
        break;

    }
    //* Gỡ lịch học khỏi lịch học sinh viên
    
    User_Schedule = RemoveFromSchedule(class_id,detailed_Schedule,User_Schedule);
    
    //*Gỡ sinh viên đó ra khỏi danh sách sinh viên của lớp 
    
    Students = Students.filter(id=>!id.toString().includes(user_id.toString()));

    //*Cập nhập lại trạng thái lớp học 
    
    remaining_seats += 1;
    occupied_seats -= 1;
    remaining_seats !== 0? available = true : available = false;

    //*Lưu dữ liệu đã sửa đổi vào database   
    
    await Promise.all([ 
        Student_Record.findOneAndUpdate({_id:user_id},{study_record}),
        Student_Schedule.findOneAndUpdate({_id:user_id},
        {class_registered,User_Schedule,total_credits}),
        Class.findOneAndUpdate({_id},{ remaining_seats,occupied_seats,available}),
        Users_inClass.findOneAndUpdate({class_id},{Students})
    ]);
    return `Lớp ${class_id} đã được xóa khỏi lịch học và danh sách các môn bạn đã đăng ký trong học kỳ này `;
}

module.exports = UnsubscribeClass;