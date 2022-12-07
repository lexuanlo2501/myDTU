const  {IsSameTime,FindDayData} = require('../../Check execeptions/class.schedule.conditions');

function AddClassSchedule(UserSchedule,Class){
    /**
     * * Hàm này được gọi khi sinh viên đã được tạo lịch
     * * và đăng ký lớp cho học kỳ 
     */
    const 
        {class_id,course_name,detailed_Schedule} = Class,
        weeks_number = detailed_Schedule.length ;
        
     //*Lặp qua toàn bộ mảng lịch học đầy đủ của môn học đó (Duyệt qua các tuần học)   
     for(let i=0;i<weeks_number;i++){
        
         //*Lấy ra lịch học tuần tương ứng  của lịch học đã tạo trước đó 
        const 
            {week,schedule} = detailed_Schedule[i],
            week_schedule = UserSchedule[week-1].week_schedule,
            daysInSchedule = schedule.length;
         
    /**
     ** Tại sao là week-1 ?
     ** Ví dụ tuần mình lấy ra từ lịch học trên lớp là tuần 3
     ** thì phần tử trong mảng lịch học sinh viên phải ở vị trí index (week) 3 - 1 = 2 
     * */   
        for(let j=0 ;j< daysInSchedule ;j++){   
    
        //*Lấy ra lịch học của ngày đó & lịch học truyền vào
    
        const 
            {week_day,date,day_schedule} = FindDayData(week_schedule,schedule,j) || {},
            {time,place} = schedule[j];
        
        switch(true){
            case(!day_schedule):
                continue;
    
            case(IsSameTime(day_schedule,time)):
                throw `Lịch lớp học bị trùng vào ngày ${week_day} ${date} nên không thể xếp lịch` ;
            }
    
        //* Thêm dữ liệu về lịch học vào lịch học ngày hôm đó & Sắp xếp lại dữ liệu lịch học ngày hôm đó theo thứ tự giờ học
        
        day_schedule.push({class_id,course_name,time,place,description:""});
        day_schedule.sort((prev,next)=>parseInt(prev.time)-parseInt(next.time));
        
        
        }
    }
        
        return [...UserSchedule];
    }

    module.exports = AddClassSchedule;