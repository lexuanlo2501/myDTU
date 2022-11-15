const Week =[
    'Chủ nhật','Thứ hai','Thứ ba',
    'Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'
]; 

const isMatchingDay = (data,Week,date)=>{
    return date.getDay()!== Week.indexOf(data.week_day) ? 
    true : false ;
}

const isEmptyDaySchedule = (cancelDate,cancel_weeks,week)=>{
    return cancelDate && cancel_weeks.length!==0 && cancelDate.abort.find(value=>value===week) ?
    true : false ; 
}

const generateDate = (data,starting_date,start_day,Week,i)=>{
    const weekIndex =  Week.indexOf(data.week_day);
    const  index = weekIndex === 0 ? 
    index = 7 : weekIndex ;
    starting_date.setDate(
    starting_date.getDate() + 7*i + Math.abs(index- start_day)
    );
    if(!isMatchingDay(data,Week,starting_date)) throw 'Thứ ngày trong thông tin lớp không khớp nhau nên không thể tạo lịch';
    return {
    ...data, date:starting_date.toLocaleDateString("en-AU") 
    }
}


const ScheduleGenerator = (from_to,timeAndplace,cancel_weeks)=>{
    
    const start_day = new Date(from_to.starting_date).getDay();
    const Schedule = [];
    
        if(start_day!==1 ) throw 'Ngày bắt đầu của lớp học phải là ngày thứ hai trong tuần ';
        const total_weeks = from_to.ending_week-from_to.starting_week;
        for(let i = 0; i<=total_weeks ;i++)
        {
            
            const week = i+from_to.starting_week
            Schedule.push({
            week, schedule:
            timeAndplace.map(data=>{    
            const starting_date = new Date(from_to.starting_date),
                    cancelDate = cancel_weeks.find(value=>value.week_day === data.week_day);
                    emptyDay = isEmptyDaySchedule(cancelDate,cancel_weeks,week);
            if(emptyDay) return ; 
            return  generateDate(data,starting_date,start_day,Week,i);
        
            }).filter(data=>data)
        });
        
    }
    return Schedule;
    
    
}


module.exports = ScheduleGenerator;