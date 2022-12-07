const courseGroup = require('../../../models/class&courses/courses-group.mongo');

const addCourseGroup = async (req,res)=>{
    try{
        const Group = new courseGroup({...req.body});
        await Group.save();
        return res.status(200).json({message:`Bạn đã thêm thành công mã chuyên ngành : ${Group.group_id}`});
    } catch (error){
        return res.status(400).json({errorMessage:error});
    }
}

const  updateCourseGroup = async (req,res)=>{
    try{
        const result = await courseGroup.findOne({...req.body});
        result.overwrite({...result._doc,...req.body});
        await result.save();
        res.status(200).json({message:`Bạn đã sửa thành công thông tin nhóm  : ${result.group_id}`});
    } catch(error){
        return res.status(400).json({
            errorMessage:`Không thể chỉnh sửa theo nội dung yêu cầu : ${{...req.body}}`
            ,errorLog:error.message
        });
    }
}

const deleteCourseGroup = async (req,res)=>{
    try {
        
        await courseGroup.findOneAndDelete({...req.body});
        return res.status(200).json({message:{...req.body,status:'removed'}});
    } catch (error) {
        return res.status(404).json({
            errorMessage:`Không thể xóa nội dung : ${{...req.body}}`,
            errorLog:error.message
        });
    }
}
const getCourseGroup = async (req,res)=>{
    try{
    const {_doc} = await courseGroup.findOne({...req.body});
    res.status(200).json({content:_doc});
    }
    catch{
        res.status(404).json({errorMessage:`Không tìm thấy nội dung bạn cần tìm`});
    }
}


const getAllCourseGroups = async (req,res)=>{
    try{
        res.status(200).json({content:await courseGroup.find()});
    }
    catch {
        res.status(404).json({errorMessage:`Không tìm thấy nội dung cần tìm kiếm`});
    }
}

module.exports = {addCourseGroup,updateCourseGroup,deleteCourseGroup,getCourseGroup,getAllCourseGroups};
