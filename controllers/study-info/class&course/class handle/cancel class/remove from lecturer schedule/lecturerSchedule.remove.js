const RemoveFromSchedule = require('../../../../../user-class.handle/Unsubscribe class/schedule.removeClass');
const LecturerSchedule = require('../../../../../../models/users/lecturer/lecturer.schedule');
const Notification = require('../../../../../../models/users/Notifications/user.notifications');
const UserNotification = require('../../../../../../models/users/Notifications/user.notifications');


async function removeLecturerSchedule(adminId,classData){
    const {class_id,lecturer=[],semester,year,detailed_Schedule=[]} = classData;
    
    await Promise.all(lecturer.map(async person=>{
        const 
            {full_name,uid} = person,
            {_id,Lecturer_Schedule} = await LecturerSchedule.findOne({lecturer_id:uid}).lean(),
            notification = new Notification({
            sender:adminId,
            receiver:_id,
            type:'Thông báo hủy lớp giảng dạy',
            content:`Vào lúc ${new Date().toLocaleString("en-AU")} hệ thống đã đóng lớp ${class_id} của ${semester} ${year} vì lý do không đảm bảo điều kiện tiếp tục duy trì giảng dạy , đề nghị giảng viên ${full_name} sau khi nhận được thông báo này xem lại lịch giảng dạy và thông tin trạng thái lớp của mình , nếu có vấn đề gì xin vui lòng liên hệ phòng đào tạo`
        });
        await Promise.all( [
            LecturerSchedule.findOneAndUpdate({lecturer_id:uid},
            {   
                Lecturer_Schedule: [...RemoveFromSchedule(class_id,detailed_Schedule,Lecturer_Schedule)],
                $pullAll:{
                    class_registered: [{_id:classData._id}]
                }
            }),
            UserNotification.findOneAndUpdate({uid:uid},{$push:{Notifications:notification._id}}),
            notification.save()
        ]);
    }));
}

module.exports = removeLecturerSchedule;

