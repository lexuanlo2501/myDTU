const studentHandle_router = require('express').Router();
const {registerClass,getUserSchedule} = require('../../controllers/user-class.handle/user-class.controller'); 
studentHandle_router.post('/registerClass',registerClass);
studentHandle_router.get('/getSchedule',getUserSchedule);
module.exports = studentHandle_router;