const 
    {CreateEmptySchedule,AddToEmptyDay} = require('./Initialize.handle'),
    WeekDays =['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'],
    {IsEmptyDate,IsSameWeek} = require('../../Check execeptions/class.schedule.conditions'); 

function InitSchedule(UserSchedule,Class,Starting_Date){
    /**
     * !Hàm này chỉ chạy khi lịch học của sinh viên chưa có gì cả 
     * !    và sinh viên đăng ký lớp đầu tiên của mình
    *@param UserSchedule : "Lịch học của người dùng được truyền vào ( [] )"
    *@param Class : "Dữ liệu lớp đăng ký"
    *@param Starting_Date : "Ngày bắt đầu của học kỳ"
    */ 
    //* số tuần mục đích chỉ để duyệt 
    let week_index = 0 , weeks_number = 18, daysInWeek = 7 ;
    for(let i = 0 ; i < weeks_number  ; i++) {
    /**
     * *Tạo một mảng rỗng chưa có gì cả tương ứng với 7 ngày trong tuần & 
     * *  lịch học của 1 tuần học gồm thứ ngày và ngày cụ thể trong tháng 
     */ const   week_schedule = Array(daysInWeek) , week = i+1;
        for(let j =0;j< daysInWeek ;j++ ){  
        /**
         ** Kiểm tra xem ngày đang duyệt có lịch học không ?
         ** Nếu không thì tạo lịch học trống cho ngày đó
         ** Nếu có thì thêm lịch học vào ngày đó 
         */

        const emptyDate = IsEmptyDate(Class.detailed_Schedule[week_index],week,WeekDays,j);
        
        switch(true){
            case(emptyDate):
                CreateEmptySchedule(Starting_Date,i,j,week_schedule);
            break;

            default :
                AddToEmptyDay(week_schedule,Class,week_index,j);
            break;
            }
        }
        const week_data = { week, week_schedule };
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

    module.exports = InitSchedule;