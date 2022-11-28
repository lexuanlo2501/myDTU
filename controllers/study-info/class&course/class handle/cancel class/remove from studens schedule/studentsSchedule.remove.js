const Notification = require('../../../../../../models/users/Notifications/user.notifications');
const UserNotification = require('../../../../../../models/users/Notifications/user.notifications');
const UnsubscribeClass = require('../../../../../user-class.handle/Unsubscribe class/class.unsubscribe');

async function removeStudentSchedule(adminId,students,classData){
    const {class_id,semester,year} = classData;
    await Promise.all(students.map(async(person_id)=>{
                
        const notification = new Notification({
            sender:adminId,
            receiver:person_id,
            type:'Thông báo hủy lớp đăng ký',
            content:`Vào lúc ${new Date().toLocaleString("en-AU")} hệ thống đã đóng lớp ${class_id} của ${semester} ${year} vì lý do không đảm bảo điều kiện tiếp tục duy trì giảng dạy , đề nghị sinh viên nhận được thông báo này xem lại lịch học và thông tin trạng thái học tập của mình , nếu có vấn đề gì xin vui lòng liên hệ phòng đào tạo`
        });
        
        await notification.save();
        await UnsubscribeClass(class_id,person_id);
        await UserNotification.findOneAndUpdate({person_id},
        { $push :{Notifications:notification._id}   });
        console.log(`Remove class schedule of ${class_id} successfully for student with obj_id : ${person_id.toString()}`);
    }))
    .catch(e=>console.log(e));
}

module.exports = removeStudentSchedule;