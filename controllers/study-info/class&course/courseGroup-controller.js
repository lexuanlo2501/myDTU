const courseGroup = require('../../../models/class&courses/courses-group.mongo');

const addCourseGroup = async (req,res)=>{
    try{
        const Group = new courseGroup({...req.body});
        await Group.save();
        return res.status(200).json({message:`Bạn đã thêm thành công mã chuyên ngành : ${Group.group_name}`});
    } catch (error){
        return res.status(401).json({errorMessage:error});
    }
} 

const  updateCourseGroup = async (req,res)=>{
    try{
        const result = await courseGroup.findById(req.params.id);
        result.overwrite({...result._doc,...req.body});
        await result.save();
        res.status(200).json({message:`Bạn đã sửa thành công mã chuyên ngành : ${result.group_name}`});
    } catch(error){
        return res.status(500).json({error:error.message});
    }
}

const deleteCourseGroup = async (req,res)=>{
    try {
        const {id}= req.params;
        await courseGroup.findByIdAndRemove(id);
        return res.status(200).json({message:`Bạn đã xóa thành công mã chuyên ngành : ${id}`});
    } catch (error) {
        return res.status(401).json({errorMessage:`Không thể xóa mã ${id}`});
    }
}
const getCourseGroup = async (req,res)=>{
    try{
    const result = await courseGroup.findById(req.params.id);
    res.status(200).json({content:result._doc});
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
