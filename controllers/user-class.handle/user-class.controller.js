const {Class_Subscribe , Class_Remove,} = require('./schedule.validate');
const Student_Schedule = require('../../models/users/student.schedule');






const registerClass = async (req,res)=>{
    const {signUpCode} = req.body;
    const uid = req.user._id; 
    try{
        const {message}  = await Class_Subscribe(signUpCode,uid);
        res.status(200).json({message:`Bạn ${message}`});
}
    catch(error)
    {
        console.log(error);
        res.status(400).json({errorMessage:`Không thể đăng ký lớp theo yêu cầu vui lòng xem lại thông tin đăng ký : ${error}`});
    }
}

const getUserSchedule = async(req,res)=>{
    const uid = req.user._id
    const user_schedule = await Student_Schedule.findById(uid);
   
    res.status(200).json({content:user_schedule._doc});
}

const removeClass = async (req,res)=>{
    const {class_name} = req.body;
    const uid = req.user._id;
    try{
        await Class_Remove(class_name,uid);
        res.status(200).json({message:`Bạn đã hủy đăng ký thành công lớp : ${class_name}`});
    }
    catch(error){
        console.log(error);
        res.status(400).json({errorMessage:`Không thể hủy đăng ký lớp ${class_name} , vui lòng xem lại tên lớp`});
    }
    }

module.exports = {registerClass,getUserSchedule,removeClass};