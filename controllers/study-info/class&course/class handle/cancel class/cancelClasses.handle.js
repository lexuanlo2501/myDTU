const Class = require('../../../../../models/class&courses/classes.mongo');
const UsersInClass = require('../../../../../models/class&courses/class-users');
const removeLecturerSchedule = require('./remove from lecturer schedule/lecturerSchedule.remove');
const removeStudentSchedule = require('./remove from studens schedule/studentsSchedule.remove');
/**
 * *Đây là hàm chỉ được dùng để đóng các lớp thỏa điều kiện sau : 
 * * Lớp có quá ít sv đăng ký (<20)
 * * GV đứng lớp không thể tiếp tục vì một lý do nào đó
 */
async function cancelClasses(req,res){
    try{
    const {conditions} =  req.body;
    
    const [StudentsInClass,classResult,result] = await Promise.all([
        UsersInClass.find({
            semester:conditions.semester , 
            year: conditions.year , 
            "Students.0":{$exists:true}
        }).lean(),
        Class.find({...conditions}).lean(), 
        Class.updateMany({...conditions},{
            available:false , 
            class_status:"Lớp học đã bị đóng do không đủ điều kiện duy trì giảng dạy" 
        })
    ]);
    
    const numberOfClasses = classResult.length;
    
    for(let i = 0; i < numberOfClasses;i++){
        const 
            {Students=[]} = StudentsInClass[i] || {},
            numberOfStudents = Students.length;
        await removeLecturerSchedule(classResult[i]); 
        
        for(let j =0;j<numberOfStudents;j+=20) 
        await removeStudentSchedule(req.user._id,Students.slice(j,j+20),classResult[i]);
        
        
    }
    const classes = StudentsInClass.map(data=>data.class_id);
    res.status(200).json({
    message:`Bạn đã đóng thành công ${result.modifiedCount} 
    Lớp bao gồm : ${classes.join(' , ')} của 
    ${req.body.conditions.semester} , ${req.body.conditions.year}
    `});
}
    catch(e){
        console.log(e);
        res.status(400).json({
            errorMessage:`Có lỗi xảy ra !`, 
            errorLog:e
        });
    }
}

module.exports = cancelClasses;