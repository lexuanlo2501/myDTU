const 
    Student = require('../../../models/users/Student/student.mongo'),
    StudentRecord = require('../../../models/users/Student/student-record.mongo'),
    Student_Schedule = require('../../../models/users/Student/student.schedule'),
    UserNotification = require('../../../models/users/Notifications/user.notifications');
    
    RegisterStudent = async (StudentData,newStudent)=>{
    const 
        {uid,study_major} = StudentData,
        {_id} = newStudent,
        student = new Student({
            _id,
            student_id:uid,
            study_major
        }),
        record = new StudentRecord({
            _id,
            student: _id,
            student_id:uid,
        }),
        schedule = new Student_Schedule({
            _id, student_id:uid
        }),
        notification = new UserNotification({
            _id, uid 
        });
    await Promise.all([
        student.save(),
        record.save(),
        schedule.save(),
        newStudent.save(),
        notification.save()
    ]);
}
module.exports = RegisterStudent;   