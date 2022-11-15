const Class = require('../../../models/class&courses/classes.mongo')
const ScheduleGenerator = require('./schedule-generator');
const getSchedule  =async(req,res)=>{
    
    try{
        const result = await Class.findOne({...req.body});
        res.status(200).json({content:result._doc});
    } 
    catch{
        res.status(404).json({errorMessage:`Không tìm thấy lịch học cần tìm theo yêu cầu : ${{...req.body}}`});
    }
}
const getAllSchedule = async (req,res)=>{
    res.status(200).json({
        content:await Class.find()
        .select('class_id course_name semester year lecturer detailed_schedule')
    });
}

const updateSchedule = async (req,res)=>{
    const {class_id,from_to,timeAndplace,cancel_weeks,modified} = req.body;
   try{ 
    let result = await Class.findOne({class_id});
    let {detailed_Schedule}  = result._doc
    if(!from_to||!timeAndplace||!cancel_weeks && modified.length===0){
        for(let i = 0 ; i<detailed_Schedule.length;i++){
        const found = modified.find(value=>value.week === detailed_Schedule[i].week);
        if(found) detailed_Schedule[i] = found ;
    }
    delete req.body.modified; 
}

    else detailed_Schedule = ScheduleGenerator(from_to,timeAndplace,cancel_weeks);
   
result.overwrite({...result._doc,...req.body,detailed_Schedule});
await result.save();
    res.status(200).json({message:`Bạn đã sửa thành công lịch học lớp ${result.class_name}`});
    } catch{
    res.status(404).json({errorMessage:`Không tìm thấy nội dung yêu cầu : ${id}`});
    }
}
const findSchedule = async(req,res)=>{
    const result = await Class.find({...req.body}).select('detailed_schedule');
    if(result.length!= 0) res.status(200).json({content:result});
    else res.status(404).json({errorMessage:`Không tìm thấy nội dung theo yêu cầu`});
}

const deleteSchedule = async(req,res)=>{
    const {class_id} = req.body;
    try{
    await Class.findOneAndDelete({class_id});
        res.status(200).json({message:`Bạn đã xóa thành công nội dung lịch học của : ${class_id}`});
    }
    catch {
        res.status(404).json({errorMessage:`Không thể xóa lịch học : ${class_id}`});
    }
}

const deleteManySchedules = async(req,res)=>{
    try{
    const result = await Class.updateMany({...req.body},{detailed_Schedule:[]});
    res.status(200).json({message:`Bạn đã xóa thành công lịch  học của  : ${result.length} môn `});
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

module.exports = {getSchedule,getAllSchedule,findSchedule,updateSchedule,updateManySchedules,deleteSchedule,deleteManySchedules};
