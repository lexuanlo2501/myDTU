const bcrypt = require('bcrypt');
const Users = require('../../models/users/users.mongo');
const UserNotification = require('../../models/users/Notifications/user.notifications'); 

const resetPass = async (req,res)=>{
    const user_pwd = req.body.password;
    const newPassword = req.body.newPassword;
    const user_data = await Users.findById(req.user._id);
    let {password} = user_data._doc;
    try{
    if(bcrypt.compareSync(user_pwd, password) === true){
    password = await bcrypt.hash(newPassword,10);
    Users.findByIdAndUpdate(req.user._id,{password});
    return res.status(200).json({message:`Bạn đã đặt lại mật khẩu thành công`});
    }
}  catch(error) {
    return res.status(400).json({
        errorMessage:`Có lỗi xảy ra , vui lòng xem lại mật khẩu hoặc thông tin đăng nhập`,
        errorLog:error
    });
}
}

const modifyPersonalInfo = async (req,res)=>{
    
    try{
       await Users.findByIdAndUpdate(req.user._id,{...req.body}) ;
       res.status(200).json({message:`Bạn đã chỉnh sửa thành công thông tin cá nhân`});
    }
    catch {
        res.status(400).json({errorMessage:`Thông tin chỉnh sửa không hợp lệ vui lòng xem lại`});
    }
    
}

const getNotifications = async(req,res)=>{
    try{
        const {Notifications}= await UserNotification.findOne({uid:req.user.uid}).populate('Notifications');
        res.status(200).json({Notifications});
    }
    catch(error){
        console.log(error);
        res.status(404).json({
            errorMessage : `Có lỗi khi lấy dữ liệu thông báo , vui lòng thử  lại sau`,
            erroLog:error
    });
}

}

module.exports = {resetPass,modifyPersonalInfo,getNotifications};