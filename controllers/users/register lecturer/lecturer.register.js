const  
    Lecturer = require('../../../models/users/lecturer/lecturer.mongo'),
    lecturerSchedule = require('../../../models/users/lecturer/lecturer.schedule'),
    UserNotification = require('../../../models/users/Notifications/user.notifications');

const RegisterLecturer = async (LecturerData,newLecturer)=>{
    const 
        {uid,degree,department,Academic_Section,lecturing_form,subjects=[]} = LecturerData,
        {_id} = newLecturer,
        lecturer = new Lecturer({
            _id,lecturer_id:uid,
            degree,department,
            Academic_Section,
            lecturing_form,subjects
        }),
        schedule = new lecturerSchedule({_id,lecturer_id:uid,}),
        notification = new UserNotification({_id,uid});
    await Promise.all([
        lecturer.save(),
        newLecturer.save(),
        schedule.save(), 
        notification.save()
    ]);
}

module.exports = RegisterLecturer;
