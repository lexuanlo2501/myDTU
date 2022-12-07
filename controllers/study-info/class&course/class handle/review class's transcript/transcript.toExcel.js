const
    fs = require('fs'),
    XLSX = require('xlsx'),
    classAcademicTranscript = require('../../../../../models/class&courses/class.academic.transcript.mongo'),
    UserInClass = require('../../../../../models/class&courses/class-users'),
    Class = require('../../../../../models/class&courses/classes.mongo'),
    Notification = require('../../../../../models/users/Notifications/notifications'),
    UserNotification  = require('../../../../../models/users/Notifications/user.notifications'),
    path = require('path'),
    studentTranscriptInClass = require('../../../../../models/users/Student/student.class.grade.mongo');


async function generateStudentTranscript(Students,classData,scoreTypes){
    const {_id} = classData;
    for(let i=0;i<Students.length;i+=20){
        const students = Students.slice(i,i+20);
        await Promise.all(students.map(async student=>{
            const transcript = new studentTranscriptInClass ({
                student_id:student.uid,
                class_taken:_id,
                scoreTypes:scoreTypes
            });
            await transcript.save();
        }));
    }
}

async function confirmNotification(adminId,submitBy,classData){
    const {class_id,semester,year} = classData;
    const notification = new Notification({
        sender:adminId,
        receiver:submitBy._id,
        Type:`Phê duyệt đề cương`,
        content:`Quản trị viên đã phê duyệt đề cương bảng điểm của lớp ${class_id} ${year} ${semester} , giảng viên ${submitBy.full_name}
        xem lại bảng điểm cụ thể của lớp và thông báo lại Phòng Đào Tạo nếu có vấn đề gì xảy ra`

    });
    await Promise.all([
        notification.save(),
        UserNotification.findOneAndUpdate({_id:submitBy._id},{$push:{Notifications:notification._id}})
        
    ]);
}


async function writeTranscriptToExcel(adminId,classTranscriptData){
    const 
        {class_id,semester,year} = classTranscriptData,
        [{Students},{submitBy,scoreTypes},classData]= await Promise.all([
        UserInClass.findOne({class_id,semester,year}).lean().populate('Students','uid full_name email date_of_birth'),
        classAcademicTranscript.findOne({class_id,semester,year}).lean(),
        Class.findOne({class_id,semester,year}).lean()
        ]),
        scores = scoreTypes.map(data=>({[Object.values([data.description]).toString()]:undefined})).reduce((prev,next)=>({...prev,...next}),{}),
        studentsToExcel = Students.map(value=>{
        return {
            "Mã sinh viên":value.uid,
            "Họ và tên":value.full_name,
            "Địa chỉ email":value.email,
            "Ngày tháng năm sinh":value.date_of_birth,
            ...scores
        }
    }),
        worksheet = XLSX.utils.json_to_sheet(studentsToExcel),
        workbook = XLSX.utils.book_new(),
        dir = `../../../../../uploads/${year}/${semester}`,
        fileName = `DSSV ${class_id}.xlsx`;
        if (!fs.existsSync(dir)) fs.mkdirSync(path.join(__dirname,dir),{recursive:true});
        
        XLSX.utils.book_append_sheet(workbook, worksheet,'sheet1' );
        XLSX.writeFile(workbook,path.join(__dirname,`${dir}/${fileName}`), { compression: true });
        await generateStudentTranscript(Students,classData,scoreTypes);
        await confirmNotification(adminId,submitBy,classData);

}

module.exports = writeTranscriptToExcel;