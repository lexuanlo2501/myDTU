const courseGroup = require('../models/courses-group.mongo');
const course =  require('../models/course.mongo');
const Class = require('../models/classes.mongo');


const addClass = async (req,res)=>{
    try{
        const newClass = new Class({
            ...req.body
        });
        await newClass.save();
        return res.status(200).json({message:`Bạn đã thêm thành công môn ${newClass.class_name}`});
    } catch (error){
        return res.status(401).json({errorMessage:error.message});
    }
} 

const  updateClass = async (req,res)=>{
    try{
        const {id} = req.params.id;
        const result = await Class.findById(id);
        result.overwrite({...result._doc,...req.body});
        await result.save();
        console.log(result);
        res.status(200).json({message:`Bạn đã sửa thành công môn ${result.class_name}`});
    } catch(error){
        return res.status(401).json({errorMessage:`Không thể sửa nội dung : ${id}`});
    }
}
        

const deleteClass = async (req,res)=>{
    try {
        const {id} = req.params.id;
        await Class.findByIdAndDelete(id);
        return res.status(200).json({message:`Bạn đã xóa thành công môn ${id}`});
    } catch (error) {
        return res.status(401).json({errorMessage:`Không thể xóa nội dung : ${id}`});
    }
}
const getClass = async (req,res)=>{
    try{ 
        const {id} = req.params.id;
        const result = await Class.findById(id);
        res.status(200).json({content:result._doc});
    } catch{
        return res.status(404).json({errorMessage:`Không tìm thấy nội dung yêu cầu : ${id}`});
    }
}


const addCourseGroup = async (req,res)=>{
    try{
        const Group = new courseGroup({
            ...req.body
        });
        await Group.save();
        return res.status(200).json({message:`Bạn đã thêm thành công mã chuyên ngành : ${Group.group_name}`});
    } catch (error){
        return res.status(401).json({errorMessage:error});
    }
} 

const  updateCourseGroup = async (req,res)=>{
    try{
        const Group = await courseGroup.findById(req.params.id);
        Group.overwrite({...Group._doc,...req.body});
        await Group.save();
        res.status(200).json({message:`Bạn đã sửa thành công mã chuyên ngành : ${Group.group_name}`});
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
    const Group = await courseGroup.findById(req.params.id);
    res.status(200).json({content:Group._doc});
    }
    catch{
        res.status(404).json({errorMessage:`Không tìm thấy nội dung bạn cần tìm`});
    }
}
const addCourse  = async(req,res)=>{
    try{
        const {id} = req.params.id;
        const newCourse = new course({
        ...req.body
    });
    await newCourse.save();
    res.status(200).json({message:`Bạn đã thêm thành công thông tin môn ${newCourse._id}`});
    }
    catch (error){
        return res.status(500).json({errorMessage:`Không thể thêm nội dung `}); 
    }
}
const  updateCourse = async (req,res)=>{
    try{
        const result = await course.findById(req.params.id);
        result.overwrite({...result._doc,...req.body});
        await result.save();
        res.status(200).json({message:`Bạn đã sửa thành công nội dung mã chuyên ngành : ${result.course_name}`});
        
    } catch(error){
        return res.status(500).json({error:error.message});
    }
}

const deleteCourse = async (req,res)=>{
    await course.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(err) return res.status(404).json({errorMessage:`Không tìm thấy môn học nào với mã : ${req.params.id}`});
        else res.status(200).json({message:`Đã xóa thành công ${docs._id}`});
    });
}
    
    

   
const getCourse= async (req,res)=>{
    try{
        const result = await course.findById(req.params.id);
        res.status(200).json({content:result._doc});
    }
    catch (error){
        res.status(404).json({errorMessage:'Không tìm thấy nội dung yêu cầu'});
    }
}

const getAllCourses = async (req,res)=>{
    try{
        res.status(400).json({content:await course.find()});
    }
    catch {
        res.status(404).json({errorMessage:`Không tìm thấy nội dung cần tìm kiếm`});
    }
}
const getAllClasses = async (req,res)=>{
    try{
        res.status(400).json({content:await Class.find()});
    }
    catch {
        res.status(404).json({errorMessage:`Không tìm thấy nội dung cần tìm kiếm`});
    }
}
const getAllCourseGroups = async (req,res)=>{
    try{
        res.status(400).json({content:await courseGroup.find()});
    }
    catch {
        res.status(404).json({errorMessage:`Không tìm thấy nội dung cần tìm kiếm`});
    }
}

module.exports = 
{
addClass,updateClass,
deleteClass,getClass,
addCourseGroup,updateCourseGroup,
deleteCourseGroup,getCourseGroup,
addCourse,updateCourse,
deleteCourse,getCourse,
getAllClasses,getAllCourses,getAllCourseGroups
};