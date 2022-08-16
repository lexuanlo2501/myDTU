const UserSchedule = require('../../models/users/user.schedule');
const Class = require('../../models/class&courses/classes.mongo');
const validateSchedule = require('./schedule.validate');
const Schedule = require('../../models/class&courses/class-schedule.mongo');

const registerClass = async(req,res)=>{
    const {signUpCode} = req.body;
    try{
        const Class_Result =  await Class.findOne({signUpCode});
        if(!Class_Result) throw 'Không thể tìm thấy lớp đăng ký , vui lòng xem lại mã đăng ký lớp';
        const {_id,class_status} = Class_Result._doc;
        if(class_status===false) throw 'Bạn không thể đăng ký lớp học do đã đủ số lượng sinh viên';
        const Class_Schedule = await Schedule.findById(_id);
        if(!Class_Schedule) throw 'Lịch học lớp này chưa có trong hệ thống , vui lòng đăng ký lớp khác';
        const this_user_schedule = await UserSchedule.findById(req.user._id);
        let {semester_Starting_Date,class_registered,User_Schedule} = this_user_schedule._doc;
        const {detailed_Schedule} = Class_Schedule._doc;
        const Class_Data = {
            ...Class_Result._doc,
            detailed_Schedule
        }
        User_Schedule = validateSchedule(User_Schedule,Class_Data,semester_Starting_Date);
        class_registered.push({
            class_id:_id,
            class_name:Class_Result._doc.class_name
        });
        this_user_schedule.overwrite({
            ...this_user_schedule._doc,
            class_registered,
            UserSchedule
        });
        await  this_user_schedule.save();
        Class_Result._doc.occupied_seats+=1;
        Class_Result._doc.remaining_seats-=1;
        await Class_Result.save();
        res.status(200).json({message:`Bạn đã đăng ký thành công lớp ${Class_Result._doc.class_name}`});
}
    catch(error)
    {
        //console.log(error);
        res.status(400).json({errorMessage:`Không thể đăng ký lớp theo yêu cầu vui lòng xem lại thông tin đăng ký : ${error.message}`});
    }
}

const getUserSchedule = async(req,res)=>{
    const user_schedule = await UserSchedule.findById(req.user._id);
    res.status(200).json({content:user_schedule._doc});
}

module.exports = {registerClass,getUserSchedule};