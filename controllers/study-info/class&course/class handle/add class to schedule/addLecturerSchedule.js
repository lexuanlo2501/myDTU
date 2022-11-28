const LecturerSchedule = require('../../../../../models/users/lecturer/lecturer.schedule');
const UserNotification = require('../../../../../models/users/Notifications/user.notifications');
const Notification = require('../../../../../models/users/Notifications/notifications');
const ConstructSchedule = require('../../../../user-class.handle/Subscribe Class/Schedule Generator/user.schedule.construct');


async function addLecturerSchedule(adminId,classData){
    const {class_id,lecturer,semester,year} = classData;
    let  _idOfLecturer = null;
    await Promise.all(lecturer.map(async person=>{
    
        const {_id,semester_Starting_Date=`08/22/${new Date().getFullYear()}`,Lecturer_Schedule=[]} = await LecturerSchedule.findOne({lecturer_id:person.uid}).lean() || {};
        if(!_id){ 
        const 
            lecturerSchedule = new LecturerSchedule({
                lecturer_id: person.uid,
                semester:semester,
                year:year
                
        }),
            userNotification = new UserNotification({
            _id:lecturerSchedule._id,
            uid: person.uid,
            
        });
        _idOfLecturer = lecturerSchedule._id;
        await lecturerSchedule.save();
        await userNotification.save();
    }
        const notification = new Notification({
            sender:adminId,
            receiver:_id || _idOfLecturer,
            Type:`Phân công lịch học lớp ${class_id} ${semester} ${year}`,
            content:`Vào lúc ${new Date().toLocaleString("en-AU")} hệ thống đã thêm vào thông tin lớp học ${class_id} ${semester} ${year} . Đề nghị giảng viên ${person.full_name} xem lại thông tin lớp học và lịch dạy và phản hồi lại với phòng đào tạo nếu có vấn đề gì xảy ra hoặc muốn thay đổi thông tin lớp học .`
            
        });
    
        await Promise.all([
            notification.save(),
            LecturerSchedule.findOneAndUpdate({lecturer_id:person.uid},
            {
                $push:{class_registered:classData._id},
                Lecturer_Schedule:ConstructSchedule([...Lecturer_Schedule],{...classData},semester_Starting_Date)
            }),
            UserNotification.findOneAndUpdate({uid:person.uid},
            { 
                $push :{Notifications:notification._id} 
            })
        ]);
    }));
}

module.exports = addLecturerSchedule;