const 
    {checkDuplicateCourse,checkPrerequisite } = require('../Check execeptions/class.schedule.conditions'),
    Student_Record = require('../../../models/users/Student/student-record.mongo'),
    Class = require('../../../models/class&courses/classes.mongo'),
    Student_Schedule = require('../../../models/users/Student/student.schedule'),
    ConstructSchedule = require('./Schedule Generator/user.schedule.construct'),
    generateRecord = require('./Record generator/record.generator'),
    Users_inClass = require('../../../models/class&courses/class-users');

async function ClassSubscribe(signUpCode,user_id){
    /**
    * *Hàm xử lý đăng ký lớp của sinh viên nhận các tham số :
    * @param signUpCode  "Mã đăng ký lớp"
    * @param user_id :"Mã người dùng (ObjectId trong database)"
    */
    //!Lưu ý : các tham số truyền vào nên chính xác để hạn chế tối đa lỗi phát sinh
    //!     trong quá trình lấy dữ liệu từ database  
    //*Xử lý lấy dữ liệu từ database dựa vào các tham số truyền vào  
        let Results = await Promise.all(
            [
                Student_Schedule.findOne({_id:user_id}).lean().populate('class_registered','course_name '),
                Student_Record.findOne({_id:user_id}).lean().populate('passed_courses','course_id course_name'),
                Class.findOne({signUpCode}).lean()
            ]),
            [UserScheduleData,UserRecord,ClassInfo] = Results.map(value=>!value?{}:value),
            { _id,class_id, course_name,course_id,detailed_Schedule,
            credits,semester,year,prerequisite_course,occupied_seats,
            remaining_seats ,available } = ClassInfo || {},
            {semester_Starting_Date,class_registered,total_credits} = UserScheduleData ||  {},
            {study_record} = UserRecord ;
    
    
        //* Xử lý các trường hợp lỗi để trả về thông báo lỗi cho người dùng 
        
        switch(true){
            
            case(Object.keys(ClassInfo).length === 0): 
                throw `Không thể tìm thấy lớp đăng ký theo mã đăng ký : ${signUpCode} , vui lòng xem lại mã đăng ký lớp`;
            
            case(!available): 
                throw 'Bạn không thể đăng ký lớp học do đã đủ số lượng sinh viên';
            
            case(checkDuplicateCourse(UserScheduleData,ClassInfo)):
                throw 'Bạn không thể đăng ký nhiều lần một môn học trong một học kỳ';
    
            case(prerequisite_course.length!==0 && !checkPrerequisite(prerequisite_course,UserRecord)):
                throw `Bạn chưa hoàn thành môn học tiên quyết của môn  ${course_name} bao gồm : ${prerequisite_course.join(' (hoặc) ')} nên không thể đăng ký lớp này , vui lòng xem lại điều kiện tiên quyết và chọn lớp khác`;
            
            case(detailed_Schedule.length=== 0):
                throw 'Lịch học lớp này chưa có trong hệ thống , vui lòng đăng ký lớp khác';
            
        }
    //*Sau khi xử lý những trường hợp ngoại lệ thì bắt đầu thêm lịch học vào 
        
        let 
            {Students} = await Users_inClass.findOne({class_id}).lean() || {},
            {User_Schedule} = UserScheduleData,
            UpdatedSchedule = ConstructSchedule([...User_Schedule],{...ClassInfo},semester_Starting_Date),
            class_data = {class_id,course_name,course_id,credits};
        
        class_registered.push(_id);
        Students.push(user_id);
        
        //*Xử lý trạng thái lớp học sau khi thêm thành công lịch học 
        
        total_credits += credits;
        occupied_seats +=  1;
        remaining_seats-= 1;
        remaining_seats === 0 ? available = false : available = true ;
        study_record = generateRecord(year,semester,study_record,class_data);
        
        //*Lưu dữ liệu vào database
        
        await Promise.all([
            Student_Record.findOneAndUpdate({_id:user_id},{study_record}),
            Class.findOneAndUpdate({class_id},{occupied_seats,remaining_seats,available}),
            Student_Record.findOneAndUpdate({_id:user_id},{...UserRecord}), 
            Student_Schedule.findOneAndUpdate({_id:user_id},{class_registered,detailed_Schedule,User_Schedule:[...UpdatedSchedule] ,total_credits}),
            Users_inClass.findOneAndUpdate({class_id},{Students})
        ]);
        
        return { message : `Bạn đã đăng ký thành công lớp ${ClassInfo.class_id} ,thông tin lớp đã được lưu vào danh sách các lớp đã đăng ký và lịch học của học kỳ này `};
    }

module.exports = ClassSubscribe;