const WeekDays =
[
    'Chủ nhật','Thứ hai','Thứ ba',
    'Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'
];

function CreateEmptySchedule(Starting_Date,indexI,indexJ,week_schedule){
    /**
     * 
     * @param {Ngày bắt đầu } Starting_Date 
     * @param {biến i trong vòng lặp for} indexI 
     * @param {biến j trong vòng lặp for} indexJ 
     * @param {lịch học tuần lấy ra} week_schedule 
     */
        const 
            starting_date= new Date(Starting_Date), starting_day = starting_date.getDay(),
            DateConfigOne =  starting_date.getDate() + 7*indexI + 6,
            DateConfigTwo =  starting_date.getDate() + 7*indexI + Math.abs(starting_day- indexJ);
    /**
     * * 
     ** nếu như j = 0 thì ngày trong tuần tương đương với ngày chủ nhật thì ta phải cộng 6 
     ** nếu không thì cộng theo số chênh lệch để xác định thứ ngày trong tuần 
     * */ 
        
        indexJ ===0 ?  starting_date.setDate(DateConfigOne) :  starting_date.setDate(DateConfigTwo) ; 
     /**
      **  Đẩy dữ liệu vào lịch học của tuần truyền vào hàm (Lịch học trống)
      */   
        week_schedule[indexJ] = {
                week_day:WeekDays[indexJ],
                date:starting_date.toLocaleDateString("en-AU"),
                day_schedule:[]  // chưa có lịch học nên để mảng rỗng
            }
    }
    
    function AddToEmptyDay(week_schedule,Class,week_index,indexJ){
    /**
     *! Hàm này chỉ dùng để thêm lịch học của môn đó vào một lịch học trống của sinh viên 
     * @param week_schedule : Lịch học trong tuần
     * @param Class : Thông tin lớp học 
     * @param week_index : Tuần học theo thứ tự , xem ở hàm gọi nó sẽ hiểu
     * @param indexJ : "Biến j trong vòng lặp for
     */
    //* Tìm ngày trong tuần trùng với ngày trong lịch học
        const {class_id,course_name,detailed_Schedule} = Class , {schedule} = detailed_Schedule[week_index];
        const DayData = schedule.find(data=> WeekDays.indexOf(data?data.week_day:undefined)===indexJ);
        const {week_day,time,place, date} = DayData; 
        /**
         * *Tạo thông tin ngày học trong đó 
         * *  mảng day_schedule (LịdateConfigTwoch học trong ngày) sẽ chứa toàn bộ 
         * *  các thông tin giờ học cũng như là thời gian và địa điểm (Mô tả cho lớp học kèm theo nếu có)
         */ 
        week_schedule[indexJ] = {
            week_day,date,day_schedule:
            [{
                class_id,
                course_name,
                time,place,
                description:""
            }]
        }
    }

    module.exports = {CreateEmptySchedule,AddToEmptyDay};