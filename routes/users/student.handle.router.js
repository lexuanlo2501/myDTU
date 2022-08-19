const studentHandle_router = require('express').Router();
const {registerClass,getUserSchedule,removeClass} = require('../../controllers/user-class.handle/user-class.controller'); 
studentHandle_router.post('/registerClass',registerClass);
studentHandle_router.delete('/removeClass',removeClass);
studentHandle_router.get('/getSchedule',getUserSchedule);
module.exports = studentHandle_router;
