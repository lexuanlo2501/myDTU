const Notification = require('../../../../../models/users/Notifications/notifications');
const UserNotification = require('../../../../../models/users/Notifications/user.notifications');
const RemoveFromSchedule = require('../../../../user-class.handle/Unsubscribe class/schedule.removeClass');
const ConstructSchedule = require('../../../../user-class.handle/Subscribe Class/Schedule Generator/user.schedule.construct');

async function updateStudentSchedule(adminId,Students,oldClassData,newClassData){
    
    const numberOfStudents = Students.length;
    const {class_id,semester,year} = oldClassData;
    
    for(let i = 0 ; i< numberOfStudents; i += 30){
            
        let errorId = null; 
        const students_chunk = Students.slice(i,i+30);
        await Promise.all(students_chunk.map(async (student_id)=>{
        const 
            notification = new Notification({
                sender:adminId,
                receiver:student_id,
                Type:"Sửa đổi lịch học",
                content:`Hệ thống vừa cập nhập lại thông tin của  lớp  ${class_id} , ${semester} , ${year} vào lúc ${new Date().toLocaleString('en-AU')}. Đề nghị sinh viên theo dõi lại trạng thái & lịch học của môn và thông báo lại phòng đào tạo nếu có vấn đề gì xảy ra `
            }),
            {semester_Starting_Date,User_Schedule}= await Student_Schedule.findOne({_id:student_id}).lean() || {},
            scheduleAfterRemoved = RemoveFromSchedule(class_id,oldClassData.detailed_Schedule,User_Schedule);
            errorId = student_id;
        await notification.save();
        await Student_Schedule.findOneAndUpdate({_id:student_id},{User_Schedule:ConstructSchedule([...scheduleAfterRemoved],newClassData,semester_Starting_Date)});
        await UserNotification.findOneAndUpdate({_id:student_id},{$push :{Notifications:notification._id}});
        
    })).catch(e=>console.log(`Có lỗi xảy ra khi cập nhập lịch học của sinh viên  ${errorId}  : ${e}`));
}

}

module.exports = updateStudentSchedule;