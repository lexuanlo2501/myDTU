const 
    classAcademicTranscript = require('../../../../../models/class&courses/class.academic.transcript.mongo'),
    Notification = require('../../../../../models/users/Notifications/notifications'),
    writeTranscriptToExcel = require('./transcript.toExcel'),
    UserNotification  = require('../../../../../models/users/Notifications/user.notifications');


async function createClassTranscript(lecturerData,classTranscript){
    //*Payload gửi về phải bao gồm các trường sau :  {class_id,semester,year,scoreTypes} ;
    try{
    const 
        admin = await UserNotification.findOne({uid:'root1'}).lean(), 
        {_id,full_name,uid} = lecturerData,
        {classData,scoreTypes,semester,year,class_id} = classTranscript,
        transcript =  new classAcademicTranscript({
        classData,submitBy:{
        lecturer:{ _id, full_name , uid}
        },scoreTypes
    });

    const notification = new Notification({
        sender:_id,
        receiver:admin._id,
        content:`Vào lúc ${new Date().toLocaleDateString("en-AU")} giảng viên ${full_name} với mã định danh ${uid} 
        đã thêm vào đề cương bảng điểm cho lớp ${class_id} ${semester} ${year} , đề nghị quản trị viên nhận được
        thông báo này xét duyệt đề cương ngay sau khi kết thúc hạn mở đăng ký lớp cho sinh viên .`
    });

    await Promise.all([
        transcript.save(),
        notification.save(),
        UserNotification.findOneAndUpdate({_id:admin._id},{$push:{Notifications:notification._id}})
    ]);
    }
    catch(e){
        console.log(e);
    }
    
} 

async function reviewClassTranscript (adminId,classTranscriptId){
    const {class_id,semester,year,status} = classTranscriptId;
    const classTranscript = await  classAcademicTranscript.findOne({class_id,semester,year}).lean();
    
    switch(true){
        case(status.includes('Approved')):
            await Promise.all([
                writeTranscriptToExcel(adminId,classTranscript),
                classAcademicTranscript.findOneAndUpdate({class_id,semester,year},{isReviewedbyAdmin:true,status})
            ]);
        break;

        case(status.includes('Rejected')):
            const notification = new Notification({
                sender:adminId,
                receiver:classTranscript.submitBy.lecturer._id,
                Type:'Phê duyệt đề cương bảng điểm',
                content:`Bảng điểm đề cương của lớp ${class_id} ${semester} ${year} do giảng viên ${classTranscript.submitBy.lecturer.full_name} nhập không phù hợp với điều kiện lớp học
                đề nghị giảng viên nhận được thông báo này liên hệ với phòng đào tạo để biết thêm chi tiết và chỉnh sửa lại cho phù hợp`
            });
            await Promise.all([
                notification.save(),
                UserNotification.findOneAndUpdate({_id:classTranscript.submitBy._id},{$push:{Notifications:notification._id}})
            ]);
    }
    await classAcademicTranscript.findOneAndUpdate({class_id,semester,year},{status});
    
}

module.exports = {createClassTranscript,reviewClassTranscript};