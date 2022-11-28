const cron = require('node-cron');
const Class = require('../../models/class&courses/classes.mongo');
const notifications = require('../../models/users/Notifications/notifications');
const UserNotitfication = require('../../models/users/Notifications/user.notifications');
const scheduleClass = async (req,res)=>{
    const {semester,year,open_time,close_time,executionType} = req.body;
    try{
    // minutes , hours , date , month , week day ,
    // Chi nen dung de mo lop / dong lop 
    if(!cron.validate(open_time) || !cron.validate(close_time)) throw `Định dạng cho cronjob không chính xác`
    
    const user_noti = await UserNotitfication.findOne({_id:req.user._id});
    const {Notifications} = user_noti._doc;
    let open_job = cron.schedule(`${open_time}`,async()=>{
        const res = await Class.updateMany({year,semester},{available:true});
        const notification = new notifications({
            sender:req.user._id,
            receiver:req.user._id,
            Type:'Cập nhập trạng thái mở các lớp',
            content:`Tại thời điểm : ${Date()} , hệ thống bắt đầu mở đăng ký cho ${res.modifiedCount} lớp học trong ${semester} , ${year}`
        });
        await notification.save();
        console.log(`Added new open notification`);
        Notifications.push(notification._id);
        await UserNotitfication.findOneAndUpdate({_id:req.user._id},{Notifications:Notifications});
        

        if(executionType === 1) {
            console.log(`Class open job ended at : ${Date()}`);
            open_job.stop();
            open_job = null;
        }
        
    });
    let close_job = cron.schedule(`${close_time}`,async()=>{
        console.log(`Class close job started at : ${Date()}`);
        const res = await Class.updateMany({year,semester},{available:false});
        console.log(`Updated : ${res.modifiedCount}`);
        const notification = new notifications({
            sender:req.user._id,
            receiver:req.user._id,
            Type:'Cập nhập trạng thái mở các lớp',
            content:`Tại thời điểm : ${Date()} , hệ thống bắt đầu đóng đăng ký cho ${res.modifiedCount} lớp học trong ${semester} , ${year}`
        });
        await notification.save();
        console.log(`Added new  close notification`);
        Notifications.push(notification._id);
        await UserNotitfication.findOneAndUpdate({_id:req.user._id},{Notifications:Notifications});
       
        if(executionType === 1) {
            console.log(`Class close job ended at : ${Date()}`);
            close_job.stop();
            close_job = null;
        }
    });
    open_job.start();
    close_job.start();
  
      
    res.status(200).json({message:`Bạn đã cài đặt thành công cronjob cập nhập thông tin các lớp tự động`});
}
    catch (error){
    res.status(400).json({errorMessage:`Đã có lỗi xảy ra , vui lòng xem lại biểu mẫu`, errorLog:error});
    }
}

module.exports = {scheduleClass}