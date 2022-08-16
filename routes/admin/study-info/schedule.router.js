const schedule_router = require('express').Router();
const {getScheduleByid,getAllSchedule,findSchedule,updateSchedule,updateManySchedules,deleteSchedule,deleteManySchedules} = require('../../../controllers/study-info/schedule controller/schedule.controller');
schedule_router.get('/getSchedule/:id',getScheduleByid);
schedule_router.get('/schedule.all',getAllSchedule);
schedule_router.patch('/updateSchedule/:id',updateSchedule);
schedule_router.patch('/updateManySchedules',updateManySchedules);
schedule_router.post('/findSchedule',findSchedule);
schedule_router.delete('/deleteSchedule/:id',deleteSchedule);
schedule_router.delete('/deleteSchedules',deleteManySchedules);

module.exports = schedule_router;