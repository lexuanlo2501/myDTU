const 
    cron = require('node-cron'),
    Class = require('../../models/class&courses/classes.mongo'),
    notifications = require('../../models/users/Notifications/notifications'),
    UserNotification = require('../../models/users/Notifications/user.notifications');

const scheduleClass = async (req,res)=>{

const {semester,year,open_time,close_time,executionType} = req.body;
try{
    
    
    if(!cron.validate(open_time) || !cron.validate(close_time)) throw `Định dạng cho cronjob không chính xác`
    
    let open_job = cron.schedule(`${open_time}`,async()=>{
        const 
            result = await Class.updateMany({year,semester},{available:true}),
            notification = new notifications({
            sender:req.user._id,
            receiver:req.user._id,
            Type:'Cập nhập trạng thái mở các lớp',
            content:`Tại thời điểm : ${new Date().toLocaleString("en-AU")} , hệ thống bắt đầu mở đăng ký cho ${result.modifiedCount} lớp học trong ${semester} , ${year}`
        });
        await notification.save();
        await UserNotification.findOneAndUpdate({_id:req.user._id},{$push:{Notifications:notification._id}});
        console.log(`Added new open notification`);
        

        if(executionType === 1) {
            console.log(`Class open job ended at : ${new Date().toLocaleString("en-AU")}`);
            open_job.stop();
            open_job = null;
        }
        
    });
    let close_job = cron.schedule(`${close_time}`,async()=>{
        console.log(`Class close job started at : ${new Date().toLocaleDateString("en_AU")}`);
        const result = await Class.updateMany({year,semester},{available:false});
        const notification = new notifications({
            sender:req.user._id,
            receiver:req.user._id,
            Type:'Cập nhập trạng thái mở các lớp',
            content:`Tại thời điểm : ${Date()} , hệ thống bắt đầu đóng đăng ký cho ${result.modifiedCount} lớp học trong ${semester} , ${year}`
        });
        await notification.save();
        await UserNotification.findOneAndUpdate({_id:req.user._id},{$push:{Notifications:notification._id}});
        console.log(`Updated : ${result.modifiedCount}`);
        console.log(`Added new  close notification`);
       
        if(executionType === 1) {
            close_job.stop();
            close_job = null;
            console.log(`Class close job ended at : ${new Date().toLocaleString("en-AU")}`);
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