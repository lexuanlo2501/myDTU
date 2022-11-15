const studentHandle_router = require('express').Router();
const {registerClass,registerClasses,getUserSchedule,removeClass} = require('../../controllers/user-class.handle/user-class.controller'); 
const {getClassById,getClassesByCourse,getAllClasses,findClasses} = require('../../controllers/study-info/class&course/class-controller');

studentHandle_router.get('/',(req,res)=>res.status(200).json({authenticate:true,accessLevel:3}))
studentHandle_router.post('/registerClass',registerClass);
studentHandle_router.post('/registerCLasses',registerClasses);
studentHandle_router.post('/classes.Find',findClasses);
studentHandle_router.post('/getByCourseInfo',getClassesByCourse);
studentHandle_router.get('/getSchedule',getUserSchedule);
studentHandle_router.get('/getClassById',getClassById);
studentHandle_router.get('/getAllClasses',getAllClasses);
studentHandle_router.delete('/removeClass',removeClass);

module.exports = studentHandle_router;
