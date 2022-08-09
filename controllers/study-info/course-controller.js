const course =  require('../../models/course.mongo');

const addCourse  = async(req,res)=>{
    try{
    const newCourse = new course({...req.body});
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
    try{
        await course.findByIdAndRemove(req.params.id);
        res.status(200).json({message:`Bạn đã xóa thành công môn : ${req.params.id}`});
    }
    catch{
        res.status(404).json({errorMessage:`Không tìm thấy nội dung cần xóa của mã môn ${req.params.id}`});
    }
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
        res.status(200).json({content:await course.find()});
    }
    catch {
        res.status(404).json({errorMessage:`Không tìm thấy nội dung cần tìm kiếm`});
    }
}


module.exports = {addCourse,updateCourse,deleteCourse,getCourse,getAllCourses};





