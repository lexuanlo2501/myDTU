//!Các hàm này là hàm kiểm tra điều kiện trả về true/false 
//!     riêng hàm FindDayData là trả về dữ liệu {Object}
module.exports = {
    //*Kiểm tra lịch học ngày hôm đó có trống không 
    
    IsEmptyDate: (WeekSchedule,week,WeekDays,index)=> {
        return WeekSchedule && 
        WeekSchedule.week === week  && 
        WeekSchedule.schedule.find(data=> 
        WeekDays.indexOf(data?data.week_day:undefined)===index)?  
        false : true
    },
    
    //*Kiểm tra xem giữa giữa 2 index có giống nhay về tuần không 
    
    IsSameWeek : (WeekSchedule,week) => {
        return WeekSchedule && WeekSchedule.week === week ? 
        true :false
    },
    
    //*Kiểm tra lịch học có bị trùng giờ học không 
    
    IsSameTime : (day_schedule,time) => day_schedule.find(data=>
    {
    //*Tách chuỗi thời gian học ra làm 2 phần thời gian bắt đầu và thời gian kết 
        
        const data_time = data.time.split("-"); 
        const day_time = time.split("-");
        return data_time[0].includes(day_time[0]) || 
        data_time[1].includes(day_time[1]); 
    }) ? true: false ,
    
    //*Trả về ngày học trong lịch 
    
    FindDayData : (week_schedule,schedule,index) => {
        return week_schedule.find(data=>data && 
            data.week_day.includes(schedule[index].week_day) && 
            data.date.includes(schedule[index].date)
    )},
    
    //*Hàm kiểm tra xem sinh viên đó có đăng ký cùng một môn trong học kỳ này không 
    
    checkDuplicateCourse : async (user_schedule,Class_Data)=>{
        if(user_schedule._doc.class_registered.length=== 0)  return false;
        const {class_registered} = await user_schedule.populate('class_registered','course_name -_id');
        const {course_name,semester,year} = Class_Data;
        return class_registered.length!==0 && 
        user_schedule.year.includes(year) && 
        user_schedule.semester.includes(semester) && 
        class_registered.find(data=>data.course_name.includes(course_name)) ? 
        true : false ;
    } ,
    
    //* Hàm kiểm tra môn tiên quyết 
    
    checkPrerequisite : async(course_list,Record)=>{
        const {passed_courses} = await Record.populate('passed_courses','course_id course_name');
    
        if(passed_courses.length === 0 ) return false ;
        
        for(let course of course_list){
        
            let [course_id,course_name] = course.split('-');
            course_id = course_id.trim();
            course_name = course_name.replace(/\w\S*/g,(txt)=>txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()).trim();
            if(passed_courses.find(classData=> 
                classData.course_id.includes(course_id) || 
                classData.course_name.includes(course_name) 
            )) return true;
            continue;
        }
    return false;
    }
}