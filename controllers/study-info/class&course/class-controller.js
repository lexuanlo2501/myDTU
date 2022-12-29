const Class = require('../../../models/class&courses/classes.mongo');
const ClassWithUsers = require('../../../models/class&courses/class-users');
const courseGroup = require('../../../models/class&courses/courses-group.mongo');


const updateManyClasses = async(req,res)=>{
/**
*! Chỉ nên dùng để cập nhập lại các thông tin như :
**_ Năm học hay học kỳ .
**_ Tình trạng lớp học
**_ Trạng thái đóng mở đăng ký / hủy môn console.log('Class ID received : ',class_id);
*! Không thể sử dụng hàm này để cập nhập lịch học của từng lớp , nếu muốn thì phải sử dụng hàm updateClass (cập nhập từng lớp)
*/
    try {
        const result = await Class.updateMany({...req.body.conditions},{...req.body.updated});
        res.status(200).json({message:`Bạn đã sửa đổi thành công thông tin của ${result.modifiedCount} lớp`});
    } catch (error){
        console.log(error);
        res.status(400).json({errorMessage:`Không thể sửa đổi thông tin lớp học theo yêu cầu `, errorLog:error});
    }
}



const deleteClass = async (req,res)=>{
    try {
        await Promise.all([
            Class.findOneAndDelete({...req.body}),
            ClassWithUsers.findOneAndDelete({...req.body})
        ]);
        return res.status(200).json({message:`Bạn đã xóa thành công nội dung lớp học : ${{...req.body}}`});
    } catch (error) {

    return res.status(400).json({
        errorMessage:`Không thể xóa nội dung lớp học : ${{...req.body}}`,
        errorLog:error
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
//*_id ở đây là objectId trong mongoDB chứ không phải mã lớp mà mình nhập vào đâu 
    const {id} = req.params;
    console.log(req.params)
    try{ 
        console.log(id);
        const result = await Class.findOne({_id:id},{__v:0}).lean();
        res.status(200).json({...result});
    } catch(error){
        console.log(error);
        return res.status(404).json({errorMessage:`Không tìm thấy nội dung yêu cầu : ${id}`});
    }
}

const getClassesByCourse= async (req,res)=>{
    const {group_id,course_id,course_name,semester,year} = req.body;
    try{
        const results = await Class.find({group_id,course_id,course_name,semester,year});
        if (results.length === 0 ) throw `Không tìm thấy nội dung yêu cầu`
        res.status(200).json({content:results});
    }
    catch(e) {
        res.status(404).json({errorMessage:e});
    }
}

const getAllClasses = async (req,res)=>{
    try{
        res.status(200).json({content:await Class.find().lean()});
    }
    catch {
        res.status(404).json({errorMessage:`Không tìm thấy nội dung cần tìm kiếm`});
    }
}

const findClassesByCondition = async (req,res)=>{
    try{
        const result = await Class.find({...req.body}).lean();
        res.status(200).json(result); 
    }
    catch {
        res.status(404).json({errorMessage:`Không tìm thấy thông tin nội dung cần tìm`});
    }
}

const getAllCourseGroup = async (req,res)=>{
    res.status(200).json(await courseGroup.find().lean());
}


module.exports = {
    updateManyClasses,deleteClass,deleteManyClasses,
    getClassById,getClassesByCourse,getAllClasses,
    findClassesByCondition,getAllCourseGroup
}