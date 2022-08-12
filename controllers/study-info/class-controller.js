const Class = require('../../models/classes.mongo');
const Schedule = require('../../models/class-schedule.mongo');
const Schedule_Generator = require('./schedule-generator');
const addClass = async (req,res)=>{
    try{
        const newClass = new Class({
            ...req.body
        });

        await newClass.save();
        const {_id,class_name,semester,year,lecturer,from_to,timeAndplace,cancel_weeks} = req.body;
        const Data = Schedule_Generator(from_to,timeAndplace,cancel_weeks);
const newSchedule = new Schedule({
    _id,class_name,semester,year,lecturer,from_to,timeAndplace,cancel_weeks,detailed_Schedule:Data});
    await newSchedule.save();
        return res.status(200).json({message:`Bạn đã thêm thành công thông tin và lịch học lớp ${newClass.class_name}`});
    } catch (error){
        return res.status(401).json({errorMessage:error.message});
    }
} 

const  updateClass = async (req,res)=>{
    const {id} = req.params;
    try{
        const result = await Class.findById(id);
        result.overwrite({...result._doc,...req.body});
        await result.save();
        res.status(200).json({message:`Bạn đã sửa thành công thông tin lớp : ${result.class_name}`});
    } catch(error){
        return res.status(401).json({errorMessage:`Không thể sửa nội dung lớp : ${id}`});
    }
}
        
const updateManyClasses = async(req,res)=>{
    try {
        const result = await Class.updateMany({...req.body.conditions},{...req.body.updated});
        res.status(200).json({message:`Bạn đã sửa đổi thành công thông tin của ${result.modifiedCount} lớp`});
    } catch (error){
        console.log(error);
        res.status(400).json({errorMessage:`Không thể sửa đổi thông tin lớp học theo yêu cầu : ${error}`});
    }
}

const deleteClass = async (req,res)=>{
    const {id} = req.params;
    try {
        await Class.findByIdAndRemove(id);
        return res.status(200).json({message:`Bạn đã xóa thành công lớp học : ${id}`});
    } catch (error) {
       
        return res.status(401).json({errorMessage:`Không thể xóa nội dung lớp học : ${id}`});
    }
}

const deleteManyClasses = async (req,res)=>{
    try{
        const result = await Class.deleteMany({...req.body});
        res.status(200).json({message:`Bạn đã xóa thành công ${result.deletedCount} người dùng`});
    }
    catch(error){
        res.status(400).json({errorMessage:`Không thể xóa thông tin lớp học theo yêu cầu : ${error.message}`});
    }
}

const getClass = async (req,res)=>{
    const {id} = req.params;
    try{ 
        const result = await Class.findById(id);
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


module.exports = {addClass,updateClass,updateManyClasses,deleteClass,deleteManyClasses,getClass,getAllClasses,findClasses}