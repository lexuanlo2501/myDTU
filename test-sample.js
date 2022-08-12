
//const Week =['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy']; 

const from_to = {
    starting_week:1,
    ending_week:18,
    starting_date:'8/22/2022',
    ending_date:'12/25/2022'
}; 



const timeAndplace = [
    {
        week_day:"Thứ hai",
        time:`9:15-11:15`,
        place:"P. Online 15 , Online"
    }
    ,

    {
    week_day:"Thứ năm",
    time:`9:15-11:15`,
    place:"P. 304 , Hòa Khánh Nam - Tòa Nhà D"
    }
];
const cancel_weeks= [
{
week_day:"Thứ hai",
abort:[3, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
},
{
week_day:"Thứ năm",
abort:[9,10]
}
];
 
const generate = (data,starting_date,start_day,Week,i)=>{
    let index = Week.indexOf(data.week_day);
    console.log(data,starting_date,start_day,Week,i);
    if(index===0) index = 7;
    starting_date.setDate(starting_date.getDate() + 7*i + Math.abs(index- start_day));
    let Date_Result  = starting_date.toLocaleDateString() ;
    console.log(Date_Result);
    return {
    ...data,
    date:Date_Result
        }
}

const DateGenerator = (from_to,timeAndplace,cancel_weeks)=>{
    const Week =['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy']; 
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
const result = DateGenerator(from_to,timeAndplace,cancel_weeks);
console.log(result);
/*const modified =  [{
    week:12,
    schedule:[{
        week_date:"Thứ sáu",
        time:`13:00-15:00`,
        place:"P. 208 , 209 Phan Thanh"
        }]

},
{
    week:17,
    schedule:[{
        week_date:"Thứ sáu",
        time:`09:00-10:00`,
        place:"Bảo tàng Hoàng Sa (Thọ Quang - Sơn Trà)"
        }]
}
];
const copy = [...Schedule];
for(let i = 0 ; i<copy.length;i++){
    const result = modified.find(value=>value.week === copy[i].week);
    if(result) copy[i] = result ;
}

console.log('Schedule modified : ',copy);
const d = new Date('8/30/2022');
d.setDate(1 - d.getDate())
console.log(d.toLocaleDateString());
*/

/*console.log( new Date('8/22/2022').toLocaleDateString());
*/