const Class = require('../../../models/class&courses/classes.mongo');
const Schedule_Generator = require('../schedule controller/schedule-generator');
const UsersInClass = require('../../../models/class&courses/class-users')
const {validateSchedule,remove_FromSchedule}  = require('../../user-class.handle/schedule.validate')
const Student_Schedule = require('../../../models/users/student.schedule');

const addClass = async (req,res)=>{
    try{
        const {from_to,timeAndplace,cancel_weeks} = req.body;
        const Data = Schedule_Generator(from_to,timeAndplace,cancel_weeks);
        const newClass = new Class({
            ...req.body,
            detailed_Schedule:Data
        });

        await newClass.save();
        const usersClass = new UsersInClass({
            class:newClass._id,
            class_id:newClass.class_id,
            year:newClass.year,
            semester:newClass.semester,

        });
        await usersClass.save()
   return res.status(200).json({message:`Bạn đã thêm thành công thông tin và lịch học lớp ${newClass.class_id}`});
    } catch (error){
        console.log(error);
        return res.status(400).json({
            errorMessage:`Không thể sửa nội dung theo yêu cầu`,
            errorLog:error.message
    });
    }
} 

const  updateClass = async (req,res)=>{
    
    const {class_id,semester,year,detailed_Schedule} = req.body
    try{
       
        const result = await Class.findOne({class_id,year,semester});
        const class_data = {...result._doc,...req.body};
        const class_w_users = await UsersInClass.findOne({class:result._doc._id});
        const {Students} = class_w_users._doc;
        
        let chunk_size ;
        
        if(result === {}) throw `Không tìm thấy thông tin lớp học theo yêu cầu`;
        
        Students.length < chunk_size ? chunk_size = Students.length : chunk_size = 30; 
        detailed_Schedule!== undefined || null ? result._doc.detailed_Schedule = detailed_Schedule : result._doc.detailed_Schedule;
        
        if( Students.length!== 0){
        for(let i = 0 ; i<Students.length;i+= chunk_size){
            
            const students_chunk = Students.slice(i,i+chunk_size);
            await Promise.all(students_chunk.map(async (student_id)=>{
               
                const student_schedule = await Student_Schedule.findOne({_id:student_id});
                const {semester_Starting_Date,User_Schedule} = student_schedule._doc
                const schedule_data = remove_FromSchedule(class_id,detailed_Schedule,User_Schedule);
                const modified = validateSchedule(schedule_data,class_data,semester_Starting_Date);
               await Student_Schedule.findByIdAndUpdate({_id:student_id},{User_Schedule:modified});
               
            })).catch(e=>console.log(`Có lỗi xảy ra khi cập nhập lịch học của sinh viên thứ ${i}  : ${e}`));
            }
        }
            await Class.findOneAndUpdate({class_id,year,semester},{...class_data});
        res.status(200).json({message:`Bạn đã sửa thành công thông tin lớp : ${result.class_id} và lịch học của ${Students.length} sinh viên`,
    });
    } catch(error){
        console.log(error);
        return res.status(400).json({
            errorMessage:`Không thể sửa nội dung lớp : ${class_id} và lịch học,`,
            errorLog:error.message
    });
    }
}
 
/*Chỉ nên dùng để cập nhập lại các thông tin như :
_ Năm học hay học kỳ .
_ Tình trạng lớp học
_ Trạng thái đóng mở đăng ký / hủy môn
*/
const updateManyClasses = async(req,res)=>{
    try {
        
        const result = await Class.updateMany({...req.body.conditions},{...req.body.updated});
        res.status(200).json({message:`Bạn đã sửa đổi thành công thông tin của ${result.modifiedCount} lớp`});
    } catch (error){
        console.log(error);
        res.status(400).json({errorMessage:`Không thể sửa đổi thông tin lớp học theo yêu cầu : ${error.message}`});
    }
}

const deleteClass = async (req,res)=>{
    try {
        await Class.findOneAndDelete({...req.body});
        await Class_w_Users.findOneAndDelete({...req.body})
        return res.status(200).json({message:`Bạn đã xóa thành công nội dung lớp học : ${{...req.body}}`});
    } catch (error) {
       
        return res.status(400).json({
            errorMessage:`Không thể xóa nội dung lớp học : ${{...req.body}}`
            ,errorLog:error.message
        });
    }
}

const deleteManyClasses = async (req,res)=>{
    try{
        const result = await Class.deleteMany({...req.body});
        res.status(200).json({message:`Bạn đã xóa thành công ${result.deletedCount} thông tin lớp học`});
    }
    catch(error){
        res.status(400).json({errorMessage:`Không thể xóa thông tin lớp học theo yêu cầu : ${error.message}`});
    }
}

const getClassById = async (req,res)=>{
    const {id} = req.params;
    try{ 
        const result = await Class.findOne({class_id:id},{_id:0,__v:0});
        res.status(200).json({content:result._doc});
    } catch{
        return res.status(404).json({errorMessage:`Không tìm thấy nội dung yêu cầu : ${id}`});
    }
}

const getAllClasses = async (req,res)=>{
    try{
        res.status(200).json({content:await Class.find()});
    }
    catch {
        res.status(404).json({errorMessage:`Không tìm thấy nội dung cần tìm kiếm`});
    }
}

const findClasses = async (req,res)=>{
    try{
        const result = await Class.find({...req.body});
        res.status(200).json({content:result}); 
    }
    catch {
        res.status(404).json({errorMessage:`Không tìm thấy thông tin nội dung cần tìm`});
    }
}


module.exports = {addClass,updateClass,updateManyClasses,deleteClass,deleteManyClasses,getClassById,getAllClasses,findClasses}