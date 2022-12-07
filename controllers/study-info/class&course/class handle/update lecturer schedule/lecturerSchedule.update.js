const Notification = require('../../../../../models/users/Notifications/notifications');
const UserNotification = require('../../../../../models/users/Notifications/user.notifications');
const LecturerSchedule = require('../../../../../models/users/lecturer/lecturer.schedule');
const RemoveFromSchedule = require('../../../../user-class.handle/Unsubscribe class/schedule.removeClass');
const ConstructSchedule = require('../../../../user-class.handle/Subscribe Class/Schedule Generator/user.schedule.construct');

async function updateLecturerSchedule(adminId,oldClassData,newClassData){
    const {class_id,lecturer,semester,year,detailed_Schedule } = oldClassData;
    await Promise.all(lecturer.map(async person=>{
    const
        {_id,semester_Starting_Date,Lecturer_Schedule} = await LecturerSchedule.findOne({lecturer_id:person.uid}).lean() || {},
        lecNotification = new Notification({
            sender:adminId,
            receiver:_id,
            Type:"Sửa đổi lịch học",
            content:`Hệ thống vừa cập nhập lại thông tin của  lớp  ${class_id} , ${semester} , ${year} vào lúc ${new Date().toLocaleString('en-AU')}. Đề nghị giảng viên ${person.full_name} theo dõi lại trạng thái & lịch học của lớp , nhắc nhớ sinh viên về việc thay đổi thông tin và thông báo lại phòng đào tạo nếu có vấn đề gì xảy ra `
        }),
        removedLecturerSchedule = RemoveFromSchedule(class_id,detailed_Schedule,Lecturer_Schedule);

    await Promise.all([
        lecNotification.save(),
        UserNotification.findOneAndUpdate({_id},{$push :{Notifications:lecNotification._id}}),
        LecturerSchedule.findOneAndUpdate({_id},
        {
            Lecturer_Schedule: ConstructSchedule([...removedLecturerSchedule],newClassData,semester_Starting_Date)
        })
    ]);
    
    }));
}

module.exports = updateLecturerSchedule;