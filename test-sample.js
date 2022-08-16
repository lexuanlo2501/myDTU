

const Week =['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy']; 
const Class1 ={
from_to :{
    starting_week:1,
    ending_week:17,
    starting_date:'8/22/2022',
    ending_date:'12/25/2022'
},
timeAndplace:[
    {
        week_day:"Thứ ba",
        time:`13:00-16:15`,
        place:"P. Online 15 , Online"
    }
    
],
cancel_weeks :[
    {
        week_day:"Thứ ba",
        abort:[1, 2, 3, 4, 5, 9, 10]
    }
],
Class_Info:{
    _id:"CR_250C_09082022",
    content_type:"Lịch học",
    class_name:"CR 250 C",
    course_name:"Nền Tảng Hệ Thống Máy Tính",
    semester:"Học Kỳ I",
    year:"Năm Học 2022-2023",
    lecturer:["NGUYỄN KIM TUẤN"],
    detailed_Schedule:[]
    
}
}
const Class2 = {
from_to :{
    starting_week:1,
    ending_week:18,
    starting_date:'8/22/2022',
    ending_date:'12/25/2022'
},
timeAndplace: [
    {
        week_day:"Thứ tư",
        time:`07:00-09:00`,
        place:"P. 505 , Hòa Khánh Nam - Tòa Nhà F"
    }
    ,
    
    {
        week_day:"Thứ bảy",
        time:`07:00-09:00`,
        place:"P. Online 21 , Online"
    }
],
cancel_weeks:[
    {
        week_day:"Thứ tư",
        abort:[9, 10]
    },
    {
        week_day:"Thứ bảy",
        abort:[2, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    }
],
    Class_Info:{
    _id:"CS_303Q_14082022",
    content_type:"Lịch học",
    class_name:"CS 303 Q",
    course_name:"Phân Tích & Thiết Kế Hệ Thống",
    semester:"Học Kỳ I",
    year:"Năm Học 2022-2023",
    lecturer:["NGUYỄN QUANG ÁNH"],
    detailed_Schedule:[]
}
};

const Class3 = {
from_to :{
    starting_week:11,
    ending_week:18,
    starting_date:'10/31/2022',
    ending_date:'12/25/2022'
},
timeAndplace :[
    {
        week_day:"Thứ tư",
        time:`09:15-11:15`,
        place:"P. 505 , Hòa Khánh Nam - Tòa Nhà F"
    }
    ,
    
    {
        week_day:"Thứ bảy",
        time:`09:15-11:15`,
        place:"P. Online 13 , Online"
    }
],
cancel_weeks:[
    
    {
        week_day:"Thứ bảy",
        abort:[18]
    }
],
Class_Info:{
    _id:"CS_466I_14082022",
    content_type:"Lịch học",
    class_name:"CS 466 I",
    course_name:"Perl & Python",
    semester:"Học Kỳ I",
    year:"Năm Học 2022-2023",
    lecturer:["NGUYỄN KIM TUẤN"],
    detailed_Schedule:[]
}

}

const Class4 = {
from_to:{
    starting_week:1,
    ending_week:17,
    starting_date:'8/22/2022',
    ending_date:'12/25/2022'
},
timeAndplace:[
    
    {
        week_day:"Thứ năm",
        time:`17:45 -21:00`,
        place:"P. 308 , 03 Quang Trung"
    }
],
cancel_weeks:[
    
    {
        week_day:"Thứ năm",
        abort:[9, 10]
    }
],
Class_Info:{
    _id:"DS_303A_14082022",
    content_type:"Lịch học",
    class_name:"DS 303 A",
    course_name:"Principles of Big Data",
    semester:"Học Kỳ I",
    year:"Năm Học 2022-2023",
    lecturer:["LÊ THANH LONG"],
    detailed_Schedule:[]
    
}
}

const Class5 = {
from_to:{
    starting_week:1,
    ending_week:8,
    starting_date:'8/22/2022',
    ending_date:'10/16/2022'
},
timeAndplace :[
    {
        week_day:"Thứ tư",
        time:`07:00-09:00`,
        place:"P. 505 , Hòa Khánh Nam - Tòa Nhà F"
    }
    ,
    
    {
        week_day:"Thứ bảy",
        time:`09:15-11:15`,
        place:"P. Online 22 , Online"
    }
],
cancel_weeks:[
    
    {
        week_day:"Thứ bảy",
        abort:[2]
    }
],
Class_Info:{
    _id:"DS_321A_14082022",
    content_type:"Lịch học ",
    class_name:"DS 321 A",
    course_name:"Machine Learning 1",
    semester:"Học Kỳ I",
    year:"Năm Học 2022-2023",
    lecturer:["NGUYỄN DŨNG"],
    detailed_Schedule:[]
}
}

const Class6 = {
from_to :{
    starting_week:2,
    ending_week:8,
    starting_date:'8/29/2022',
    ending_date:'10/16/2022'
},
timeAndplace :[
    {
        week_day:"Thứ hai",
        time:`17:45 -21:00`,
        place:"P. 502 , 03 Quang Trung"
    }
    ,
    
    {
        week_day:"Thứ sáu",
        time:`07:00 -10:15`,
        place:"P. 502 , 03 Quang Trung"
    }
],
cancel_weeks :[
    {
        week_day:"Thứ hai",
        abort:[6, 7, 8]
    },
    {
        week_day:"Thứ sáu",
        abort:[2]
    }
],
Class_Info:{
    _id:"DS_321A1_14082022",
    content_type:"Lịch học ",
    class_name:"DS 321 A1",
    course_name:"Machine Learning 1",
    semester:"Học Kỳ I",
    year:"Năm Học 2022-2023",
    lecturer:["NGUYỄN DŨNG"],
    detailed_Schedule:[]
}

}

const Class7 = {
from_to: {
    starting_week:1,
    ending_week:8,
    starting_date:'8/22/2022',
    ending_date:'10/16/2022'
},
timeAndplace:[
    {
        week_day:"Thứ hai",
        time:`07:00 -11:15`,
        place:"P. 406 , 209 Phan Thanh"
    }
    
],
cancel_weeks: [
    {
        week_day:"Thứ hai",
        abort:[3]
    }
],
Class_Info:{
    _id:"DS_347A_14082022",
    content_type:"Lịch học ",
    class_name:"DS 347 A",
    course_name:"Đồ Án CDIO",
    semester:"Học Kỳ I",
    year:"Năm Học 2022-2023",
    lecturer:["NGUYỄN DŨNG"],
    detailed_Schedule:[]
}

}

const Class8 = {

from_to :{
    starting_week:1,
    ending_week:8,
    starting_date:'8/22/2022',
    ending_date:'10/16/2022'
},
timeAndplace:[
    {
        week_day:"Thứ năm",
        time:`13:00 -15:00`,
        place:"P. 801B , 254 Nguyễn Văn Linh"
    }
    
],
cancel_weeks :[
    
],
Class_Info:{
    _id:"ENG_218A_14082022",
    content_type:"Lịch học ",
    class_name:"ENG 218 A",
    course_name:"Listening - Level 3",
    semester:"Học Kỳ I",
    year:"Năm Học 2022-2023",
    lecturer:["LÊ THỊ HUỲNH LỘC"],
    detailed_Schedule:[]
}

}

const Class9 = {
from_to:{
    starting_week:1,
    ending_week:14,
    starting_date:'8/22/2022',
    ending_date:'27/11/2022'
},
timeAndplace:[
    {
        week_day:"Thứ tư",
        time:`15:15 -17:15`,
        place:"P. Sân thể thao 3 , Hòa Khánh Nam - Tòa Nhà A"
    }
    
],
cancel_weeks : [
    {
        week_day:"Thứ tư",
        abort:[9,10]
    }
],
Class_Info:{
    _id:"ES_273AO_14082022",
    content_type:"Lịch học ",
    class_name:"ES 273 AO",
    course_name:"Bóng Chuyền Cao Cấp",
    semester:"Học Kỳ I",
    year:"Năm Học 2022-2023",
    lecturer:["LƯƠNG  TRỌNG ĐĂNG KHOA"],
    detailed_Schedule:[]
}
}
const Class10 = {
from_to : {
    starting_week:11,
    ending_week:17,
    starting_date:'10/31/2022',
    ending_date:'12/18/2022'
},
timeAndplace:[
    {
        week_day:"Thứ sáu",
        time:`17:45 -21:00`,
        place:"P. 613 , 03 Quang Trung"
    }
    
],
cancel_weeks:[
    
],
    Class_Info:{
    _id:"POS_351AI_14082022",
    content_type:"Lịch học ",
    class_name:"POS 351 AI",
    course_name:"Chủ Nghĩa Xã Hội Khoa Học",	
    semester:"Học Kỳ I",
    year:"Năm Học 2022-2023",
    lecturer:["ĐOÀN THỊ CẨM VÂN"],
    detailed_Schedule:[]
    }
}







/*const generate = (data,starting_date,start_day,Week,i)=>{
    let index = Week.indexOf(data.week_day);
    
    if(index===0) index = 7;
    starting_date.setDate(starting_date.getDate() + 7*i + Math.abs(index- start_day));
    let Date_Result  = starting_date.toLocaleDateString() ;

    return {
    ...data,
    date:Date_Result
        }
}

const DateGenerator = (from_to,timeAndplace,cancel_weeks,Week)=>{
   
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
    }
    
    return Schedule;
    
    
}


let sample = [];


// Hàm tạo lịch đẩy đủ 7 ngày trong tuần với phần tử 0 tương ứng với chủ nhật
const GenerateData = (sample,Class,Week)=>{
     // hàm này chỉ chạy khi lịch học của sinh viên chưa có gì cả và sinh viên đăng ký lớp đầu tiên của mình
    for(let i = 0 ; i < 18 ; i++) 
    {
        const week_schedule = [undefined,undefined,undefined,undefined,undefined,undefined,undefined];
        if(Class.detailed_Schedule[i]){
        for(let j=0;j<Class.detailed_Schedule[i].schedule.length;j++)   // tạo lịch học cụ thể theo thứ ngày trong tuần , nếu ngày đó không có lịch học thì phần tử tại đó sẽ là undefined   
        {
            const data = Class.detailed_Schedule[i].schedule[j];
            if(data){
                week_schedule[Week.indexOf(data.week_day)] = {
                    week_day:data.week_day,
                date:data.date,
                Study_Schedule:[{class_id:Class._id,class_name:Class.class_name,course_name:Class.course_name,time:data.time,place:data.place,lecturer:Class.lecturer[0]}]
            };
        }
       
    }
    sample.push({
        week:Class.detailed_Schedule[i].week,
        week_schedule
    });
}
    else {
        sample.push({
            week:i+1,
            week_schedule
        })
    }

}

return sample;
}

const AddClassSchedule = (sample,Class,Week)=>{
    console.log(Class);
    const length = Math.abs(Class.detailed_Schedule[Class.detailed_Schedule.length-1].week - Class.detailed_Schedule[0].week );
    for(let i=0;i<=length;i++)
    {
        //console.log('week : ',Class.detailed_Schedule[i].week);
        
        const week_data = sample[Class.detailed_Schedule[i].week-1].week_schedule; // tìm phần tử theo vị trị trong mảng
        const class_Data = Class.detailed_Schedule[i].schedule;
        console.log(class_Data); // lấy lịch học của môn truyền vào
        //console.log('week data : ',week_data);
        for(let j =0; j<class_Data.length;j++)
        {   
            //console.log(`class_Data[${j}]`,class_Data[j]);
                if(class_Data[j]){
                const index = Week.indexOf(class_Data[j].week_day);
                //console.log('index : ',index);
                //console.log(`week_data[${index}] : `,week_data[index]);
                if(!week_data[index]) week_data[index]  = {
                    week_day:class_Data[j].week_day,
                    date:class_Data[j].date,
                    Study_Schedule:[
                        {class_id:Class._id,class_name:Class.class_name,course_name:Class.course_name,time:class_Data[j].time,place:class_Data[j].place,lecturer:Class.lecturer[0]}
                    ]
                }
                else {
                    if(!week_data[index].Study_Schedule.find(data=>{
                        const data_time = data.time.split("-");
                        const class_time = class_Data[j].time.split("-");
                        return data_time[0] === class_time[0] ||  data_time[1] === class_time[1];              
                    })) week_data[index].Study_Schedule.push({class_id:Class._id,class_name:Class.class_name,course_name:Class.course_name,time:class_Data[j].time,place:class_Data[j].place,lecturer:Class.lecturer[0]});
                    else throw 'Lịch học bị trùng không thể đăng ký';
                }
            }
        }
        
        }
        
    
    return sample;
}

const validateSchedule = (sample,Class,Week) =>{
    let result_sample;
    
    if(sample.length===0){
        
        result_sample = GenerateData(sample,Class,Week);
    }
    else {
        result_sample = AddClassSchedule(sample,Class,Week);
    }
    
    return result_sample;
}
Class1.detailed_Schedule = DateGenerator(from_to1,timeAndplace1,cancel_weeks1,Week);
const test1 = validateSchedule(sample,Class1,Week);
//console.log('test no1 : ',test);
Class2.detailed_Schedule = DateGenerator(from_to2,timeAndplace2,cancel_weeks2,Week);
//console.log('Class2.detailed_Schedule : ',Class2.detailed_Schedule);
const test2 = validateSchedule(test1,Class2,Week);
//console.log('test2',test2);
Class3.detailed_Schedule = DateGenerator(from_to3,timeAndplace3,cancel_weeks3,Week);
//console.log('Class3.detailed_Schedule : ',Class3.detailed_Schedule);
const test3 = validateSchedule(test2,Class3,Week);
//console.log('test3',test3);
Class4.detailed_Schedule = DateGenerator(from_to4,timeAndplace4,cancel_weeks4,Week);
//console.log('Class3.detailed_Schedule : ',Class3.detailed_Schedule);
const test4 = validateSchedule(test3,Class4,Week);
Class5.detailed_Schedule = DateGenerator(from_to5,timeAndplace5,cancel_weeks5,Week);
//console.log('Class3.detailed_Schedule : ',Class3.detailed_Schedule);
const test5 = validateSchedule(test4,Class5,Week);
Class6.detailed_Schedule = DateGenerator(from_to6,timeAndplace6,cancel_weeks6,Week);
//console.log('Class3.detailed_Schedule : ',Class3.detailed_Schedule);
const test6= validateSchedule(test5,Class6,Week);
Class7.detailed_Schedule = DateGenerator(from_to7,timeAndplace7,cancel_weeks7,Week);
//console.log('Class3.detailed_Schedule : ',Class3.detailed_Schedule);
const test7 = validateSchedule(test6,Class7,Week);
Class8.detailed_Schedule = DateGenerator(from_to8,timeAndplace8,cancel_weeks8,Week);
//console.log('Class3.detailed_Schedule : ',Class3.detailed_Schedule);
const test8 = validateSchedule(test7,Class8,Week);
Class9.detailed_Schedule = DateGenerator(from_to9,timeAndplace9,cancel_weeks9,Week);
//console.log('Class3.detailed_Schedule : ',Class3.detailed_Schedule);
const test9 = validateSchedule(test8,Class9,Week);
Class10.detailed_Schedule = DateGenerator(from_to10,timeAndplace10,cancel_weeks10,Week);
//console.log('Class3.detailed_Schedule : ',Class3.detailed_Schedule);
const test10 = validateSchedule(test9,Class10,Week);

console.log('test10',test10);


const ModifiedClass = {
    _id:"CR_250C_09082022",
    class_name:"CR 250 C",
    course_name:"Nền Tảng Hệ Thống Máy Tính",
    lecturer:["NGUYỄN KIM TUẤN"],
    modified:[

    ]

}
*/
const generate = (data,starting_date,start_day,Week,i)=>{
    let index = Week.indexOf(data.week_day);
    
    if(index===0) index = 7;
    starting_date.setDate(starting_date.getDate() + 7*i + Math.abs(index- start_day));
    let Date_Result  = starting_date.toLocaleDateString() ;

    return {
    ...data,
    date:Date_Result
        }
}

const DateGenerator = (from_to,timeAndplace,cancel_weeks,Week)=>{
   
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
    }
    
    return Schedule;
    
    
}


let sample = [];


// Hàm tạo lịch đẩy đủ 7 ngày trong tuần với phần tử 0 tương ứng với chủ nhật
const GenerateData = (sample,Class,Week)=>{
     // hàm này chỉ chạy khi lịch học của sinh viên chưa có gì cả và sinh viên đăng ký lớp đầu tiên của mình
     const {_id,class_name,course_name,detailed_Schedule} = Class.Class_Info;
     
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
                                course_name,
                                time,
                                place,
                                description:''
                            }
                        ]
                    }
                }
                else{
                    let  starting_date= new Date('8/22/2022');
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
                    let  starting_date= new Date('8/22/2022'); // logic như ở trên
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
   
    const {_id,class_name,course_name,detailed_Schedule} = Class.Class_Info;
    try{
    for(let i=0;i<detailed_Schedule.length;i++) // lặp qua toàn bộ mảng lịch học đầy đủ của môn học đó
    {
        //console.log(sample);
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
                    course_name,
                    time,
                    place,
                    description:''
                    })
                    day_schedule.sort((prev,next)=>parseInt(prev.time)-parseInt(next.time));
            }
        }
    }
}
catch(error)
{
    console.log(sample);
    console.log(error);
}
    return sample;
}

const validateSchedule = (sample,Class,Week) =>{
    let result_sample;
    
    if(sample.length===0){
        
        result_sample = GenerateData(sample,Class,Week);
    }
    else {
        result_sample = AddClassSchedule(sample,Class);
    }
    
    return result_sample;
}

Class1.Class_Info.detailed_Schedule = DateGenerator(Class1.from_to,Class1.timeAndplace,Class1.cancel_weeks,Week);
console.log(Class1.Class_Info.detailed_Schedule);
sample = validateSchedule(sample,Class1,Week);

//console.log(sample);

Class3.Class_Info.detailed_Schedule = DateGenerator(Class3.from_to,Class3.timeAndplace,Class3.cancel_weeks,Week);
sample = validateSchedule(sample,Class3,Week);
//console.log(sample);

Class4.Class_Info.detailed_Schedule = DateGenerator(Class4.from_to,Class4.timeAndplace,Class4.cancel_weeks,Week);
sample = validateSchedule(sample,Class4,Week);
//console.log(sample);
Class10.Class_Info.detailed_Schedule = DateGenerator(Class10.from_to,Class10.timeAndplace,Class10.cancel_weeks,Week);
sample = validateSchedule(sample,Class10,Week);

//console.log(sample);
Class8.Class_Info.detailed_Schedule = DateGenerator(Class8.from_to,Class8.timeAndplace,Class8.cancel_weeks,Week);
sample = validateSchedule(sample,Class8,Week);

Class6.Class_Info.detailed_Schedule = DateGenerator(Class6.from_to,Class6.timeAndplace,Class6.cancel_weeks,Week);
sample = validateSchedule(sample,Class6,Week);
//console.log(sample);
Class5.Class_Info.detailed_Schedule = DateGenerator(Class5.from_to,Class5.timeAndplace,Class5.cancel_weeks,Week);
sample = validateSchedule(sample,Class5,Week);
Class2.Class_Info.detailed_Schedule = DateGenerator(Class2.from_to,Class2.timeAndplace,Class2.cancel_weeks,Week);
sample = validateSchedule(sample,Class2,Week);

Class7.Class_Info.detailed_Schedule = DateGenerator(Class7.from_to,Class7.timeAndplace,Class7.cancel_weeks,Week);
sample = validateSchedule(sample,Class7,Week);
//console.log(sample);

//console.log(sample);

Class9.Class_Info.detailed_Schedule = DateGenerator(Class9.from_to,Class9.timeAndplace,Class9.cancel_weeks,Week);
sample = validateSchedule(sample,Class9,Week);
//console.log(sample);


/*Class2.Class_Info.detailed_Schedule = DateGenerator(Class2.from_to,Class2.timeAndplace,Class2.cancel_weeks,Week);
sample = validateSchedule(sample,Class2,Week);
console.log(sample);
*/

console.log(sample);
