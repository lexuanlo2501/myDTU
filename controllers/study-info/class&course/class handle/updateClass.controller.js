const 
    Class = require('../../../../models/class&courses/classes.mongo'),
    updateStudentSchedule = require('./update student schedule/studentSchedule.update'),
    updateLecturerSchedule = require('./update lecturer schedule/lecturerSchedule.update'),
    removeLecturerSchedule = require('./cancel class/remove from lecturer schedule/lecturerSchedule.remove'),
    addLecturerSchedule = require('./add class to schedule/addLecturerSchedule'),
    UsersInClass = require('../../../../models/class&courses/class-users');
/**
 * * Hàm updateClass dùng để cập nhập lại thông tin của lớp học cũng như thông tin lịch học của sinh viên cũng như
 * * lịch dạy của giảng viên 
 * ! Khi gửi request bắt buộc phải có :
 * * _ class_id : Mã lớp 
 * * _ semester : Học kỳ 
 * * _ year : Năm học 
 * * _ với các thông tin khác khi update thì chỉ thực hiện update thông tin lớp đó
 * * _ nếu truyền thêm detailed_Schedule (lịch học) thì hàm sẽ thực hiện cập nhập lại lịch học cho giảng viên và sinh viên 
 */

async function updateClass(req,res){
    
    const {class_id,lecturer=[],semester,year} = req.body;
    try{
        const 
            classResult = await Class.findOne({class_id,year,semester}).lean() || {},
            {Students} = await UsersInClass.findOne({class:classResult._id}).lean() || {},
            updatedClassData = {...classResult,...req.body};
        
        
        switch(true){
            case (Object.keys(classResult).length === 0 ):
                throw `Không tìm thấy thông tin lớp học theo yêu cầu`;
            
                
            case (lecturer.length!==0):
                //* Lọc lại danh sách giảng viên phụ trách lớp để gỡ lịch dạy ra khỏi lịch giảng viên cũ và thêm vào lịch giảng viên mới
                
                await removeLecturerSchedule(req.user._id,{...classResult,lecturer:classResult.lecturer.filter(person=>!lecturer.includes(person.uid))});
                await addLecturerSchedule(req.user._id,{...updatedClassData,lecturer:lecturer.filter(person=>!classResult.lecturer.includes(person.uid))});
                await updateStudentSchedule(req.user._id,Students,classResult,updatedClassData);
            
            break;

            default:
                
                await updateLecturerSchedule(req.user._id,classResult,updatedClassData);
                await updateStudentSchedule(req.user._id,Students,classResult,updatedClassData);
            
            break;
        }
                
        await Class.findOneAndUpdate({class_id:class_id},{...updatedClassData});        
        res.status(200).json({message:`Bạn đã sửa thành công thông tin lớp : ${classResult.class_id} ${req.body.detailed_Schedule?`,lịch dạy của giảng viên ${[...classResult.lecturer.map(person=>person.full_name)].join(',')} và lịch học của ${Students.length} sinh viên`:``}`});
    } 
    catch(error){
        console.log(error);
        return res.status(400).json({
        errorMessage:`Không thể sửa nội dung lớp : ${class_id} và lịch học,`,
        errorLog:error
    });
    }
}

module.exports = updateClass;