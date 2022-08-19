const Schedule = require('../../models/class&courses/class-schedule.mongo');
const Student_Record = require('../../models/users/student-record.mongo');
const Class = require('../../models/class&courses/classes.mongo');
const Student_Schedule = require('../../models/users/student.schedule');
 
 
 const GenerateData = (sample,Class,Starting_Date)=>{
    // hàm này chỉ chạy khi lịch học của sinh viên chưa có gì cả và sinh viên đăng ký lớp đầu tiên của mình
    const Week =['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'];
    
    const {_id,class_name,course,detailed_Schedule} = Class;
    
    for(let i = 0 ; i < 18 ; i++) 
    {
       let week_data;
       
       const week_schedule = [undefined,undefined,undefined,undefined,undefined,undefined,undefined];
       if(detailed_Schedule[i]) // nếu như có tuần học trong lịch của môn
       {
           for(let j =0;j<7;j++){  // tạo lịch của 1 tuần học gồm thứ ngày và ngày cụ thể trong tháng
               const result_data = detailed_Schedule[i].schedule.find(data=> Week.indexOf(data?data.week_day:undefined)===j); // tìm ngày trong tuần trùng với ngày trong lịch học
               if(result_data)
               {   const {week_day,time,place, date} = result_data;
                   week_schedule[j] = {
                       week_day,
                       date,
                       day_schedule:[ // tạo thông tin ngày học trong đó mảng day_schedule sẽ chứa toàn bộ các thông tin giờ học
                           {
                               Class_id:_id,
                               class_name,
                               course,
                               time,
                               place,
                               description:''
                           }
                       ]
                   }
               }
               else{
                   let  starting_date= new Date(Starting_Date);
                   let starting_day = starting_date.getDay();
                   j===0?starting_date.setDate(starting_date.getDate() + 7*i + 6) : starting_date.setDate(starting_date.getDate() + 7*i + Math.abs(starting_day- j)); // nếu như j = 0 thì ngày trong tuần tương đương với ngày chủ nhật thì ta phải cộng 6 nếu không thì cộng theo số chênh lệch để xác định thứ ngày trong tuần
                   const date = starting_date.toLocaleDateString();
                   week_schedule[j] = {
                       week_day:Week[j],
                       date,
                       day_schedule:[] // chưa có lịch học nên để mảng rỗng
                   }
               }
           }
            week_data = {
               week:detailed_Schedule[i].week ,  // lấy ra tuần học từ lịch học
               week_schedule
           }
       }
       else  // không có thì phải tạo ra lịch tuần học đó trống với các ngày tương ứng
       {
           for(let j =0;j<7;j++)
           {
                   let  starting_date= new Date(Starting_Date); // logic như ở trên
                   let starting_day = starting_date.getDay();
                   j===0?starting_date.setDate(starting_date.getDate() + 7*i + 6) : starting_date.setDate(starting_date.getDate() + 7*i + Math.abs(starting_day- j)); // nếu như j = 0 thì ngày trong tuần tương đương với ngày chủ nhật thì ta phải cộng 6 nếu không thì cộng theo số chênh lệch để xác định thứ ngày trong tuần
                   const date = starting_date.toLocaleDateString();
               week_schedule[j] = {
                   week_day:Week[j],
                   date,
                   day_schedule:[] // chưa có lịch học nên để mảng rỗng
               }
           }
           week_data = {
               week:i+1 ,  // lấy ra tuần học từ lịch học
               week_schedule
           }
       }
      sample.push(week_data);
   }
   

return sample;
}

const AddClassSchedule = (sample,Class)=>{
   
    const {_id,class_name,course,detailed_Schedule} = Class;
    for(let i=0;i<detailed_Schedule.length;i++) // lặp qua toàn bộ mảng lịch học đầy đủ của môn học đó
    {
        const {week,schedule} = detailed_Schedule[i];
        const week_schedule = sample[week-1].week_schedule; // lấy ra lịch học tuần tương ứng của lịch học đã tạo trước đó
        for(let j=0;j<schedule.length;j++)
        {
            const day_data = week_schedule.find(data=>
                {   if(schedule[j]) return data.week_day === schedule[j].week_day && data.date === schedule[j].date;
                    return data=== undefined;
                }); // tìm ngày học tương ứng nếu không có trả ra undefined
                if(day_data){
                const {day_schedule} = day_data; // lấy ra lịch học của ngày đó
                const schedule_of_day =  schedule[j]; // lấy ra lịch học truyền vào
                const {time,place} = schedule_of_day;
               if(day_schedule.find(data=>
                    {
                        const data_time = data.time.split("-"); // tách chuỗi thời gian học ra làm 2 phần thời gian bắt đầu và thời gian kết 
                        const day_time = schedule_of_day.time.split("-");
                        return data_time[0] === day_time[0] || data_time[1] === day_time[1];
                    
                    })) throw "Lịch học bị trùng không thể xếp lịch" ;
                else day_schedule.push({
                    Class_id:_id,
                    class_name,
                    course,
                    time,
                    place,
                    description:''
                    })
                    day_schedule.sort((prev,next)=>parseInt(prev.time)-parseInt(next.time));
            }
        }
    }
    return sample;
}

const validateSchedule = (sample,Class,Starting_Date) =>{
    let result_sample;
    
    if(sample.length===0){
        
        result_sample = GenerateData(sample,Class,Starting_Date);
    }
    else {
        result_sample = AddClassSchedule(sample,Class);
    }
    
    return result_sample;
}

const checkPrerequisite = (class_arr,user_arr)=>{
    
    for(let i=0;i<user_arr.length;i++)
    {
        const user_data = user_arr[i];
        for(let j=0;j<class_arr.length;j++)
        {
            if(user_data.find(class_arr[j])) return true;

        }
    }
    
    return false;
}

const Class_Subscribe = async (signUpCode,uid) =>{
    let [this_user_schedule,record_result,Class_Result] = await Promise.all([Student_Schedule.findById(uid),Student_Record.findById(uid),Class.findOne({signUpCode})]);
    let {_id, course,class_name,credits,semester,year,class_status,prerequisite_course,occupied_seats,remaining_seats} = Class_Result._doc;
    let Class_Schedule = await Schedule.findById(_id);
    let {semester_Starting_Date,class_registered,total_credits} = this_user_schedule._doc;
    let Schedule_Data = [...this_user_schedule._doc.User_Schedule];
    let {detailed_Schedule} = Class_Schedule._doc;
    let Class_Data = {
        ...Class_Result._doc,
        detailed_Schedule
    }
    let final_schedule = validateSchedule(Schedule_Data,Class_Data,semester_Starting_Date);
    let class_data = {_id,course,class_name,credits};
    let {passed_courses,study_record} = record_result._doc;
    
    

    if(!Class_Result) throw 'Không thể tìm thấy lớp đăng ký , vui lòng xem lại mã đăng ký lớp';
    if(checkDuplicateCourse(this_user_schedule._doc,Class_Result._doc) === true) throw 'Bạn không thể đăng ký nhiều lần một môn học trong một học kỳ';
    if(class_status===false) throw 'Bạn không thể đăng ký lớp học do đã đủ số lượng sinh viên';
    if(prerequisite_course.length!==0 && checkPrerequisite(prerequisite_course,passed_courses)=== false)throw `Bạn chưa hoàn thành môn tiên quyết của môn ${course} , vui lòng xem lại điều kiện tiên quyết và chọn lớp khác`;
    if(!Class_Schedule) throw 'Lịch học lớp này chưa có trong hệ thống , vui lòng đăng ký lớp khác';
    
   
    class_registered.push({
        Class_id:_id,
        class_name:Class_Result._doc.class_name,
        course:Class_Result._doc.course,
        credits
    });
    total_credits = class_registered.map(data=>data.credits).reduce((prev,next)=>prev + next);
    
    occupied_seats =  occupied_seats + 1;
    remaining_seats=  remaining_seats - 1;

    study_record = generateRecord(year,semester,study_record,class_data);
    await Promise.all([Student_Record.findOneAndUpdate({_id:uid},{study_record}),Class.findOneAndUpdate({_id},{occupied_seats,remaining_seats}),Student_Record.findOneAndUpdate({_id:uid},{...record_result}), Student_Schedule.findOneAndUpdate({_id:uid},{  class_registered,detailed_Schedule,User_Schedule:[...final_schedule] ,total_credits})]);
    return {message : `đã thêm thành công lớp ${Class_Result._doc.class_name} vào danh sách lớp đã đăng ký và lịch học của học kỳ này `};
}

const Class_Remove = async (class_name,uid)=>{
    const [student_record,student_schedule]= await Promise.all([ Student_Record.findById(uid),Student_Schedule.findById(uid)]);
    const {study_record} = student_record._doc;
    
    let {semester,year,class_registered,User_Schedule,total_credits} = student_schedule._doc;
    
    const class_schedule = await Schedule.findOne({semester,year,class_name});
    
    const {detailed_Schedule} = class_schedule._doc;
    if(class_schedule === {}) throw `Không tìm thấy thông tin lớp ${class_name} theo yêu cầu`;
            const class_result= class_registered.find(data=>data.class_name === class_name);
          
            const {credits} = class_result;
             class_registered = class_registered.filter(data=>data.class_name !== class_name);
             total_credits = total_credits- credits;
             const record_result = study_record.find(data=>data.year === year);
             if(record_result) 
             {
              
                if(semester === 'Học Kỳ I') record_result.semesterI =  record_result.semester_I.filter(data=>data.class_name!== class_name);
                else if (semester === 'Học Kỳ II') record_result.semester_II =  record_result.semester_II.filter(data=>data.class_name!== class_name);
                else if(semester === 'Học Kỳ Hè') record_result.summer_semester =  record_result.summer_semester.filter(data=>data.class_name!== class_name);
             }
             
             for(let i=0 ; i <  detailed_Schedule.length;i++)
             {
                const {week,schedule} = detailed_Schedule[i];
                const {week_schedule} = User_Schedule[week-1];
                console.log(`schedule : ${schedule}`);
                for(let j=0;j< schedule.length;j++)
                {
                   
                    if(schedule[j]){
                    const day_data = week_schedule.find(data=>data.week_day === schedule[j].week_day && data.date === schedule[j].date);
                    if(day_data) day_data.day_schedule = day_data.day_schedule.filter(data=>data.class_name!== class_name);
                    }
                }
             }
            await Promise.all([ Student_Record.findByIdAndUpdate(uid,{study_record}),Student_Schedule.findByIdAndUpdate(uid,{semester,year,class_registered,User_Schedule,total_credits})]);
            return `Lớp ${class_name} đã được xóa khỏi lịch học và các môn đã đăng ký trong học kỳ này `;
    }


const generateRecord = (year,semester,study_record,class_data)=>{
    const result_data = study_record.find(data=>data.year===year);
    if(study_record.length===0 ||!result_data )
    {   
        const semester_I = [];
        const semester_II = [];
        const summer_semester = [];
        if(semester === 'Học Kỳ I')  semester_I.push(class_data);
        else if (semester === 'Học Kỳ II') semester_II.push(class_data);
        else if(semester === 'Học Kỳ Hè') summer_semester.push(class_data);
        study_record.push({year,semester_I,semester_II,summer_semester});
    }
    else {
      
        if(semester === 'Học Kỳ I')  result_data.semester_I.push(class_data);
        else if (semester === 'Học Kỳ II') result_data.semester_II.push(class_data);
        else if(semester === 'Học Kỳ Hè') result_data.summer_semester.push(class_data);
    }
    return study_record;
}

const checkDuplicateCourse = (user_schedule,Class_Data)=>{
    const {class_registered} = user_schedule;
    const {course,semester,year} = Class_Data;
    if(class_registered.length!==0 && user_schedule.year === year && user_schedule.semester=== semester && class_registered.find(data=>data.course === course )!==undefined) return true;
    return false;
}


module.exports = {Class_Subscribe , Class_Remove,};