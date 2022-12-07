const  
    Lecturer = require('../../../models/users/lecturer/lecturer.mongo'),
    lecturerSchedule = require('../../../models/users/lecturer/lecturer.schedule'),
    UserNotification = require('../../../models/users/Notifications/user.notifications');

const RegisterLecturer = async (LecturerData,newLecturer)=>{
    console.log(LecturerData.uid);
    const 
        {uid,degree,department,Academic_Section,lecturing_form,subjects=[]} = LecturerData,
        lecSchedule = await lecturerSchedule.findOne({lecturer_id:uid}).lean() || {},
        lecturer = new Lecturer({
            lecturer_id:uid,degree,department,
            Academic_Section,lecturing_form,subjects
        });
        
    if(!lecSchedule._id){
        
    const
        schedule = new lecturerSchedule({_id:newLecturer._id,lecturer_id:uid,}),
        notification = new UserNotification({_id:newLecturer._id,uid});
    await Promise.all([
        schedule.save(), 
        notification.save()
    ]);
}
    else{
        lecturer._id = lecSchedule._id ;
        newLecturer._id = lecSchedule._id ;
    }
    await Promise.all([
        lecturer.save(),
        newLecturer.save()
    ]);

}

module.exports = RegisterLecturer;
