const schedule_router = require('express').Router();
const {getSchedule,getAllSchedule,findSchedule,updateSchedule,updateManySchedules,deleteSchedule,deleteManySchedules} = require('../../../controllers/study-info/schedule controller/schedule.controller');
schedule_router.get('/getSchedule',getSchedule);
schedule_router.get('/schedules/all',getAllSchedule);
schedule_router.patch('/updateSchedule',updateSchedule);
schedule_router.patch('/updateManySchedules',updateManySchedules);
schedule_router.post('/findSchedule',findSchedule);
schedule_router.delete('/deleteSchedule',deleteSchedule);
schedule_router.delete('/deleteSchedules',deleteManySchedules);

module.exports = schedule_router;