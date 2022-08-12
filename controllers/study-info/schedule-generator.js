const validate = (data,Week,date)=>{
    if(date.getDay()!== Week.indexOf(data.week_day)) return false;
    return true;
}

const generate = (data,starting_date,start_day,Week,i)=>{
    let index = Week.indexOf(data.week_day);
    if(index===0) index = 7;
    starting_date.setDate(starting_date.getDate() + 7*i + Math.abs(index- start_day));
    const check = validate(data,Week,starting_date);
    if(check===false) throw 'Có lỗi xảy ra : thứ ngày không khớp nhau';
    else{
    const Date_Result  = starting_date.toLocaleDateString() ;
   
    return {
    ...data,
    date:Date_Result
        }
    }

}


const Schedule_Generator = (from_to,timeAndplace,cancel_weeks)=>{
    
    const Week =['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy']; 
    console.log(from_to,timeAndplace,cancel_weeks);
    const start_day = new Date(from_to.starting_date).getDay();
    const Schedule = [];
    
        if(start_day!==1 ) throw 'Ngày bắt đầu của học kỳ phải là thứ 2';
        for(let i = 0;i<= from_to.ending_week-from_to.starting_week;i++)
        {
            const week  = i+from_to.starting_week;
            Schedule.push({
                week,
                schedule:timeAndplace.map(data=>{
                const starting_date = new Date(from_to.starting_date);
                const cancelDate = cancel_weeks.find(value=>value.week_day === data.week_day);
                if(!cancelDate || cancel_weeks.length===0 || !cancelDate.abort.find(value=>value===week)) {
                    const final = generate(data,starting_date,start_day,Week,i);
                    return final;
                }
                else return undefined;
            })
        });
        console.log(Schedule[i]);
    }
    return Schedule;
    
    
}

module.exports = Schedule_Generator;