const UsersInClass = require('../../../../models/class&courses/class-users');
const ScheduleGenerator = require('../../schedule controller/schedule-generator');
const Class = require('../../../../models/class&courses/classes.mongo');
const addLecturerSchedule = require('./add class to schedule/addLecturerSchedule');


async function addClass (req,res){

    try{
        if (await Class.findOne({class_id:req.body.class_id, semester: req.body.semester ,year: req.body.year})) throw `Lớp ${req.body.class_id} đã tồn tại `;
            const 
                {from_to,timeAndplace,cancel_weeks} = req.body,
                newClass = new Class({
                ...req.body,
                detailed_Schedule:ScheduleGenerator(from_to,timeAndplace,cancel_weeks)
                }),
                usersInClass = new UsersInClass({
                    class:newClass._id,
                    class_id:newClass.class_id,
                    year:newClass.year,
                    semester:newClass.semester, 
                });
            
            await addLecturerSchedule(req.user._id,{...newClass._doc});    
            await Promise.all([newClass.save(),usersInClass.save()]);
            
            return res.status(200).json({message:`Bạn đã thêm thành công thông tin và lịch học lớp ${newClass.class_id}`});
        } 
    catch (error){
        console.log(error);
        return res.status(400).json({
            errorMessage:`Không thể sửa nội dung theo yêu cầu`,
            errorLog:error
        });
    }
    
    } 

module.exports = addClass;