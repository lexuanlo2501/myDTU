const Student_Record = require('../../models/users/student-record.mongo'),
    Class = require('../../models/class&courses/classes.mongo'),
    Student_Schedule = require('../../models/users/student.schedule'),
    Users_inClass = require('../../models/class&courses/class-users'),
    Conditions = require('./schedule.conditions'),
    {   IsEmptyDate,IsSameWeek,IsSameTime,FindDayData,
        checkDuplicateCourse,checkPrerequisite 
    } = Conditions ,WeekDays =
    [
        'Chủ nhật','Thứ hai','Thứ ba',
        'Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'
    ];

function CreateEmptySchedule(Starting_Date,indexI,indexJ,week_schedule){
/**
 * 
 * @param {Ngày bắt đầu } Starting_Date 
 * @param {biến i trong vòng lặp for} indexI 
 * @param {biến j trong vòng lặp for} indexJ 
 * @param {lịch học tuần lấy ra} week_schedule 
 */
    const starting_date= new Date(Starting_Date), starting_day = starting_date.getDay();
/**
 * * 
 ** nếu như j = 0 thì ngày trong tuần tương đương với ngày chủ nhật thì ta phải cộng 6 
 ** nếu không thì cộng theo số chênh lệch để xác định thứ ngày trong tuần 
 * */  
    indexJ ===0 ? 
    starting_date.setDate(
    starting_date.getDate() + 7*indexI + 6) : 
    starting_date.setDate(
    starting_date.getDate() + 7*indexI + Math.abs(starting_day- indexJ)); 
 /**
  **  Đẩy dữ liệu vào lịch học của tuần truyền vào hàm (Lịch học trống)
  */   
    week_schedule[indexJ] = {
            week_day:WeekDays[indexJ],
            date:starting_date.toLocaleDateString("en-AU"),
            day_schedule:[]  // chưa có lịch học nên để mảng rỗng
        }
}

function AddToEmptyWeek(week_schedule,Class,week_index,indexJ){
/**
 *! Hàm này chỉ dùng để thêm lịch học của môn đó vào một lịch học trống của sinh viên 
 * @param week_schedule : "Lịch học trong tuần"
 * @param Class : "Thông tin lớp học truyền vào"
 * @param week_index : "Tuần học theo thứ tự , xem ở hàm gọi nó sẽ hiểu"
 * @param indexJ : "Biến j trong vòng lặp for" 
 */
    const {class_id,course_name,detailed_Schedule} = Class,
    //* Tìm ngày trong tuần trùng với ngày trong lịch học
        {week_day,time,place, date} = detailed_Schedule[week_index]
        .schedule.find(data=> WeekDays
        .indexOf(data?data.week_day:undefined)===indexJ);
    /**
     * *Tạo thông tin ngày học trong đó 
     * *  mảng day_schedule (Lịch học trong ngày) sẽ chứa toàn bộ 
     * *  các thông tin giờ học cũng như là thời gian và địa điểm (Mô tả cho lớp học kèm theo nếu có)
     */ 
    week_schedule[indexJ] = {
        week_day,date,day_schedule:
        [{
            class_id,
            course_name,
            time,place,
            description:""
        }]
    }
}

function InitSchedule(UserSchedule,Class,Starting_Date){
/**
 * !Hàm này chỉ chạy khi lịch học của sinh viên chưa có gì cả 
 * !    và sinh viên đăng ký lớp đầu tiên của mình
*@param UserSchedule : "Lịch học của người dùng được truyền vào ( [] )"
*@param Class : "Dữ liệu lớp đăng ký"
*@param Starting_Date : "Ngày bắt đầu của học kỳ"
*/ 

//* số tuần mục đích chỉ để duyệt 
let week_index = 0 , 
    weeks_number = 18 ;

for(let i = 0 ; i < weeks_number  ; i++) {
//*Tạo một mảng rỗng chưa có gì cả tương ứng với 7 ngày trong tuần 
    const   week_schedule = [],
            week = i+1, 
            week_data = {week};
            week_schedule.length = 7;
//*Tạo lịch của 1 tuần học gồm thứ ngày và ngày cụ thể trong tháng */ 
    for(let j =0;j<7;j++){  
        const emptyDate = IsEmptyDate(Class.detailed_Schedule[week_index],week,WeekDays,j);

/**
 **Kiểm tra xem ngày đang duyệt có lịch học không ?
 **     Nếu không thì tạo lịch học trống cho ngày đó
 **     Nếu có thì thêm lịch học vào ngày đó 
*/
        switch(true){
            case(emptyDate):
                CreateEmptySchedule(Starting_Date,i,j,week_schedule);
            break;

            case(!emptyDate):
                AddToEmptyWeek(week_schedule,Class,week_index,j);
            break;
        }
    }
    week_data.week_schedule = week_schedule;
    const sameWeek = IsSameWeek(Class.detailed_Schedule[week_index],week);
/**
 * !Mục đích của việc kiểm tra việc tuần trong lịch học của môn có bằng so với tuần đang duyệt
 * !   ở vòng lặp for hay không ? để tránh trường hợp sinh viên đăng ký một số môn ở giai đoạn 2
 * !   khiến cho lịch học hiển thị bị sai về ngày tháng
*/
    if(sameWeek) week_index++ ;
    UserSchedule.push(week_data);
}
    return UserSchedule;
}

function AddClassSchedule(UserSchedule,Class){
/**
 * * Hàm này được gọi khi sinh viên đã được tạo lịch
 * * và đăng ký lớp cho học kỳ 
 */
const {class_id,course_name,detailed_Schedule} = Class;
const  weeks_number = detailed_Schedule.length ;
/**
 **Lặp qua toàn bộ mảng lịch học đầy đủ của môn học đó (Duyệt qua các tuần học)   
 * */ 
for(let i=0;i<weeks_number;i++){
/**
 **Lấy ra lịch học tuần tương ứng 
 **của lịch học đã tạo trước đó 
 */
    const {week,schedule} = detailed_Schedule[i];
    const week_schedule = UserSchedule[week-1].week_schedule;
    const daysInSchedule = schedule.length;
/**
 ** Tại sao là week-1 ?
 ** Ví dụ tuần mình lấy ra từ lịch học trên lớp là tuần 3
 ** thì phần tử trong mảng lịch học sinh viên phải ở vị trí index (week) 3 - 1 = 2 
 * */   
    for(let j=0 ;j< daysInSchedule ;j++){   

    //*Lấy ra lịch học của ngày đó & lịch học truyền vào

    const {day_schedule} = FindDayData(week_schedule,schedule,j) || {};
    const {time,place} = schedule[j];
        switch(true){
            case(!day_schedule):
                continue;
            case(IsSameTime(day_schedule,time)):
                throw "Lịch học bị trùng không thể xếp lịch" ;
        }
    //* Thêm dữ liệu về lịch học vào lịch học ngày hôm đó &
    day_schedule.push({class_id,course_name,time,place,description:""});
    //* Sắp xếp lại dữ liệu lịch học ngày hôm đó theo thứ tự giờ học
    day_schedule.sort((prev,next)=>parseInt(prev.time)-parseInt(next.time));
    }
}
    return [...UserSchedule];
}

function ConstructSchedule(UserSchedule,Class,Starting_Date){
    if(UserSchedule.length===0)  return InitSchedule(UserSchedule,Class,Starting_Date);  
    return AddClassSchedule(UserSchedule,Class);
}

async function ClassSubscribe(signUpCode,uid,user_id){
/**
* *Hàm xử lý đăng ký lớp của sinh viên nhận các tham số :
* @param signUpCode  "Mã đăng ký lớp"
* @param uid "Mã sinh viên"
* @param user_id :"Mã người dùng (ObjectId trong database)"
*/
//!Lưu ý : các tham số truyền vào nên chính xác để hạn chế tối đa lỗi phát sinh
//!     trong quá trình lấy dữ liệu từ database  
//*Xử lý lấy dữ liệu từ database dựa vào các tham số truyền vào  
    let Results = await Promise.all(
        [
            Student_Schedule.findOne({student_id:uid}),
            Student_Record.findOne({student_id:uid}),
            Class.findOne({signUpCode})
        ]),
        [this_user_schedule,record_result,Class_Result] = Results.map(value=>!value?{}:value),
        {_id,class_id, course_name,course_id,detailed_Schedule,credits,semester,year,prerequisite_course,occupied_seats,remaining_seats ,available} = {...Class_Result._doc} ?? {},
        {semester_Starting_Date,class_registered,total_credits} = this_user_schedule._doc ?? {},
        {study_record,passed_courses} = record_result._doc , Record = record_result ,
        ClassRegistered = [...class_registered];


//*Xử lý các trường hợp lỗi để trả về thông báo lỗi cho người dùng 
    switch(true){
        case(Object.keys(Class_Result).length === 0): 
            throw `Không thể tìm thấy lớp đăng ký  theo mã đăng ký : ${signUpCode} , vui lòng xem lại mã đăng ký lớp`;
        
        case(!available): 
            throw 'Bạn không thể đăng ký lớp học do đã đủ số lượng sinh viên';
        
        case(await checkDuplicateCourse(this_user_schedule,Class_Result._doc)):
            
            throw 'Bạn không thể đăng ký nhiều lần một môn học trong một học kỳ';

        case(prerequisite_course.length!==0 && !await checkPrerequisite(prerequisite_course,Record)):
            throw `Bạn chưa hoàn thành môn học tiên quyết của môn  ${course_name} bao gồm : ${prerequisite_course.join(' (hoặc) ')} nên không thể đăng ký lớp này , vui lòng xem lại điều kiện tiên quyết và chọn lớp khác`;
        
        case(detailed_Schedule.length=== 0):
            throw 'Lịch học lớp này chưa có trong hệ thống , vui lòng đăng ký lớp khác';
        
    }
//*Sau khi xử lý những trường hợp ngoại lệ thì bắt đầu thêm lịch học vào 
    
    let uic = await Users_inClass.findOne({class_id}) || {},
        {Students} = {...uic._doc} ,
        Schedule_Data = this_user_schedule._doc.User_Schedule,
        Class_Data = {...Class_Result._doc},
        final_schedule = ConstructSchedule(Schedule_Data,Class_Data,semester_Starting_Date),
        class_data = {class_id,course_name,course_id,credits};
    
    ClassRegistered.push(_id);
    Students.push(user_id);
    //*Xử lý trạng thái lớp học sau khi thêm thành công lịch học 
    total_credits += credits;
    occupied_seats +=  1;
    remaining_seats-= 1;
    remaining_seats ===0 ? available = false : available = true ;
    study_record = generateRecord(year,semester,study_record,class_data);
    //*Lưu dữ liệu vào databas
    await Promise.all([
        Student_Record.findOneAndUpdate({student_id:uid},{study_record}),
        Class.findOneAndUpdate({class_id},{occupied_seats,remaining_seats,available}),
        Student_Record.findOneAndUpdate({student_id:uid},{...record_result}), 
        Student_Schedule.findOneAndUpdate({student_id:uid},{class_registered:ClassRegistered,detailed_Schedule,User_Schedule:[...final_schedule] ,total_credits}),
        Users_inClass.findOneAndUpdate({class_id},{Students})
    ]);
    
    return { message : `đã thêm thành công lớp ${Class_Result._doc.class_id} vào danh sách lớp đã đăng ký và lịch học của học kỳ này `};
}

function RemoveFromSchedule(class_id,detailed_Schedule,User_Schedule){
    /**
     * !Lưu ý : Hàm này chỉ có tác dụng gỡ lịch học môn đó ra khỏi lịch học sinh viên 
     * @param class_id : Mã lớp 
     * @param detailed_Schedule : lịch học môn đó
     * @param User_Schedule : lịch học sinh viên 
     */
    const numberOfweeks = detailed_Schedule.length;
    for(let i=0 ; i < numberOfweeks ; i++)
    {
        //*Lọc lại mảng lịch học sinh viên , chỉ giữ lại lịch học của những môn chưa hủy đăng ký
        const {week,schedule} = detailed_Schedule[i];
        const {week_schedule} = User_Schedule[week-1];
        const daysInSchedule = schedule.length;
        for(let j=0 ; j < daysInSchedule ; j++ )
            {
                if(!schedule[j]) continue;
                const day_data = week_schedule.find(data=>
                    data.week_day.includes(schedule[j].week_day) && 
                    data.date.includes(schedule[j].date)
                );
                day_data ? 
                day_data.day_schedule = day_data.day_schedule
                .filter(data=>!data.class_id.includes(class_id)) : 
                day_data ;
                
            }
    }
    return [...User_Schedule];
}

async function UnsubcribeClass(class_id,uid,user_id){
    /**
     * *Hàm xử lý hủy đăng ký môn của sinh viên 
     * @param class_id : Mã lớp
     * @param uid : Mã sinh viên 
     * @param user_id : Mã người dùng (ObjectId trong database)
     */
//*Lấy dữ liệu từ database 
    let [student_record,student_schedule,uic] = await Promise.all([ 
        Student_Record.findOne({student_id:uid}),
        Student_Schedule.findOne({student_id:uid}),
        Users_inClass.findOne({class_id})
    ]),
        {study_record} = student_record ? student_record._doc : {} ,
        {Students} = uic ? uic._doc : {},
        {semester,year,class_registered,User_Schedule,total_credits} 
        = student_schedule ? student_schedule._doc : {},
        class_info = await Class.findOne({class_id,semester,year}) ?? {},
        record_result = study_record.find(data=>data.year.includes(year)),
        {_id,remaining_seats,occupied_seats,available,credits,detailed_Schedule} 
        = Object.keys(class_info).length!==0 ? class_info._doc : {};
//*Xử lý ngoại lệ để trả ra thông báo lỗi 
    switch(true){
    
    case (Object.keys(class_info).length===0):
        throw `Không tìm thấy thông tin lớp ${class_id} theo yêu cầu`;

    case (class_registered.length === 0):
        throw 'Bạn không có môn nào để hủy đăng ký';

    case (!class_registered.find(id=>id!==null && id.toString().includes(_id.toString()))):
        throw 'Môn này không có trong danh sách các môn đã đăng ký'         
    }
//*Lọc lớp hủy đăng ký này ra khỏi danh sách các lớp đã đăng ký & giảm số tín chỉ đã đăng ký trong học kỳ         
    class_registered = class_registered.filter(id=>!id.toString().includes(_id.toString()) && id!== null);
    total_credits -= credits;
    
    if(record_result) switch(true){
        
        case (semester.includes('Học Kỳ I')):
            record_result.semester_I =  record_result.semester_I
            .filter(data=>!data.class_id.includes(class_id));
        break;

        case (semester.includes('Học Kỳ II')):
            record_result.semester_II =  record_result.semester_II
            .filter(data=>!data.class_id.includes(class_id));
        break;

        case (semester.includes('Học Kỳ Hè')):
            record_result.summer_semester =  record_result.summer_semester
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
        Student_Record.findOneAndUpdate({student_id:uid},{study_record}),
        Student_Schedule.findOneAndUpdate({student_id:uid},{semester,year,
        class_registered,User_Schedule,total_credits}),
        Class.findByIdAndUpdate(_id,{ remaining_seats,occupied_seats,available}),
        Users_inClass.findOneAndUpdate({class_id},{Students})
    ]);
   return `Lớp ${class_id} đã được xóa khỏi lịch học và danh sách các môn bạn đã đăng ký trong học kỳ này `;
}
    

function generateRecord(year,semester,study_record,class_data){
    /**
     * *Hàm này được dùng để tạo thông tin toàn bộ quá trình học của sinh viên bao gồm 
     * *    những lớp đã đăng ký theo từng học kỳ của từng năm
     * @param year : Năm học
     * @param semester : Học kỳ
     * @param study_record : Mảng lưu trữ thông tin thành tích học tập theo từng học kỳ của từng năm
     * @param class_data : Thông tin về lớp học  
     */
    const Record = [...study_record],
        result_data = Record.find(data=>data.year===year),
        semester_I  = [],
        semester_II = [],
        summer_semester = [];
    //*Thêm thông tin lớp vào từng học kỳ theo năm tương ứng
    switch(true){
        case(semester.includes('Học Kỳ I')):
            Record.length!==0 && result_data ? result_data.semester_I.push(class_data) : 
            semester_I.push(class_data);
        break ;

        case(semester.includes('Học Kỳ II')):
            Record.length!==0 && result_data ? result_data.semester_II.push(class_data) : 
            semester_II.push(class_data);
        break ;

        case(semester.includes('Học Kỳ Hè')):
            Record.length!==0 && result_data ?result_data.summer_semester.push(class_data) : 
            summer_semester.push(class_data);
        break ;

    }
    
    return Record.length!==0 && result_data ? [...Record] : 
        [
            ...Record,
        {
            year,semester_I,
            semester_II,summer_semester
        }
        ];
}

module.exports = {ClassSubscribe , UnsubcribeClass,ConstructSchedule,RemoveFromSchedule};