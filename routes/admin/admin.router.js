const Root_router = require('express').Router();
const user_router = require('./admin-user/admin-user.router');
const class_router = require('./study-info/class.router');
const course_router = require('./study-info/course.router');
const group_router = require('./study-info/courseGroup.router');
const schedule_router = require('./study-info/schedule.router');
const systemSchedule_router = require('./study-info/system.schedule.router');
Root_router.get('/',(req,res)=>{
    console.log('Admin');
    return res.status(200).json({authenticate:true,accessLevel:1});
});

Root_router.use('/',user_router);
Root_router.use('/',class_router);
Root_router.use('/',course_router);
Root_router.use('/',group_router);
Root_router.use('/',schedule_router);
Root_router.use('/',systemSchedule_router)

module.exports = Root_router;








