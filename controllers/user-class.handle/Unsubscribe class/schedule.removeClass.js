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
        const 
            {week,schedule} = detailed_Schedule[i],
            {week_schedule} = User_Schedule[week-1],
            daysInSchedule = schedule.length;
        
        for(let j=0 ; j < daysInSchedule ; j++ )
            {
                
                if(!schedule[j]) continue;
                const day_data = week_schedule.find(dayData=>
                    dayData.week_day.includes(schedule[j].week_day) && 
                    dayData.date.includes(schedule[j].date)
                );
                if(day_data) {
                
                day_data.day_schedule = day_data.day_schedule
                .filter(data=>!data.class_id.includes(class_id)) ;
                
            }
                
            }
    }
    
    return [...User_Schedule];
}

module.exports = RemoveFromSchedule;