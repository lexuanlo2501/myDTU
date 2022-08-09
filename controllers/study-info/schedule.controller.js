const Schedule = require('../../models/class-schedule.mongo');

const getScheduleByid  =async(req,res)=>{
    const {id} = req.params;
    try{
        const result = await Schedule.findById(id);
        res.status(200).json({content:result._doc});
    } 
    catch{
        res.status(404).json({errorMessage:`Không tìm thấy lịch học cần tìm : ${id}`});
    }
}
const getAllSchedule = async (req,res)=>{
    res.status(200).json({content:await Schedule.find()});
}

const updateSchedule = async (req,res)=>{
    const {modified} = req.body;
    const {id} = req.params;
   try{ const result = await Schedule.findById(id);
    const {detailed_Schedule} = result._doc;
    for(let i = 0 ; i<detailed_Schedule.length;i++){
        const found = modified.find(value=>value.week === detailed_Schedule[i].week);
        if(found) detailed_Schedule[i] = found ;
    }
    delete req.body.modified; 
    result.overwrite({...result._doc,...req.body,detailed_Schedule});
    await result.save();
    res.status(200).json({message:`Bạn đã chỉnh sửa thành công nội dung lịch học : ${id}`});
    } catch{
    res.status(404).json({errorMessage:`Không tìm thấy nội dung yêu cầu : ${id}`});
    }
}
const findSchedule = async(req,res)=>{
    const result = await Schedule.find({...req.body});
    if(result.length!= 0) res.status(200).json({content:result});
    else res.status(404).json({errorMessage:`Không tìm thấy nội dung theo yêu cầu`});
}

const deleteSchedule = async(req,res)=>{
    const {id} = req.params;
    try{
        await Schedule.findByIdAndRemove(id);
        res.status(200).json({message:`Bạn đã xóa thành công lịch học : ${id}`});
    }
    catch {
        res.status(404).json({errorMessage:`Không thể xóa lịch học : ${id}`});
    }
}

const deleteManySchedules = async(req,res)=>{
    try{
    const result = await Schedule.deleteMany({...req.body});
    res.status(200).json({message:`Bạn đã xóa thành công lịch  học của  : ${result.deletedCount} môn `});
    } 
    catch(error){
        res.status(400).json({errorMessage:`Không thể xóa lịch học theo yêu cầu , vui lòng xem lại biểu mẫu : ${error.message}`});
    }
}

const updateManySchedules  = async(req,res)=>{
    try{
    const result = await Schedule.updateMany({...req.body.conditions},{...req.body.updated});
    res.status(200).json({message:`Bạn đã sửa đổi thành công thông tin của ${result.modifiedCount} lịch học`});
    }
    catch(error) {
        res.status(400).json({errorMessage:`Có vấn đề với việc chỉnh sửa thông tin , vui lòng xem lại biểu mẫu : ${error.message}`});
    }
}

module.exports = {getScheduleByid,getAllSchedule,findSchedule,updateSchedule,updateManySchedules,deleteSchedule,deleteManySchedules};
