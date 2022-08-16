 


const GenerateData = (sample,Class,Starting_Date)=>{
    // hàm này chỉ chạy khi lịch học của sinh viên chưa có gì cả và sinh viên đăng ký lớp đầu tiên của mình
    const Week =['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'];
    //console.log(Class);
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

module.exports = validateSchedule;