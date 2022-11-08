const {Class_Subscribe , Class_Remove,} = require('./schedule.validate');
const Student_Schedule = require('../../models/users/student.schedule');



const registerClass = async (req,res)=>{
    const {signUpCode} = req.body;
    const {uid,_id} = req.user;
    
    try{
        const {message}  = await Class_Subscribe(signUpCode,uid,_id);
        res.status(200).json({message:`Bạn ${message}`});
}
    catch(error)
    {
        console.log(error);
        res.status(400).json({errorMessage:`Không thể đăng ký lớp theo yêu cầu vui lòng xem lại thông tin đăng ký : ${error}`});
    }
}

const registerClasses = async (req,res)=>{
    const {signUpCodeList} = req.body;
    const {uid} = req.user;
    const success = [];
    const failure = [];
    for(let code of signUpCodeList){
    try{
        const {message}  =  await Class_Subscribe(code,uid);
      
        success.push({ signUpCode: code ,message});
    }
    catch(error)
    {
        failure.push({signUpCode: code , message:error});
    }
}
    res.status(200).json({message: `Kết quả thực hiện đăng ký các lớp  theo các mã đăng ký : ${signUpCodeList.toString()}`, info: {success,failure} });
}

const getUserSchedule = async(req,res)=>{
    const {uid} = req.user
    const user_schedule = await Student_Schedule.findById(uid);
   
    res.status(200).json({content:user_schedule._doc});
}

const removeClass = async (req,res)=>{
    const {class_id} = req.body;
    const {uid,_id} = req.user;
    try{
        await Class_Remove(class_id,uid,_id);
        res.status(200).json({message:`Bạn đã hủy đăng ký thành công lớp : ${class_id}`});
    }
    catch(error){
        console.log(error);
        res.status(400).json({errorMessage:`Không thể hủy đăng ký lớp ${class_id} , vui lòng xem lại tên lớp`,
                            errorLog:error
                            });
    }
}

const removeClasses = async (req,res)=>{
    const {removeList} = req.body;
    const {uid} = req.user;
    const success = [];
    const failure = [];
    for(let name of removeList){
    try{
        const message  =  await Class_Remove(name,uid);
      
        success.push({ class: name ,message});
    }
    catch(error)
    {
        failure.push({signUpCode: code , message:error});
    }
}
    res.status(200).json({message: `Kết quả thực hiện hủy đăng ký các lớp  theo các lớp được yêu cầu hủy : ${removeList.toString()}`, info: {success,failure} });
}


module.exports = {registerClass,registerClasses,getUserSchedule,removeClass,removeClasses};


