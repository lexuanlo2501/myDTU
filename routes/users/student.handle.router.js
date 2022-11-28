const 
    studentHandle_router = require('express').Router(),
    {getCurriculum,getStudentRecord,getStudentSchedule} = require('../../controllers/study-info/student study info/studentInfo.handle'),
    {registerClass,removeClass} = require('../../controllers/user-class.handle/user-class.controller'),
    {getClassById,getClassesByCourse,getAllClasses,findClassesByCondition} = require('../../controllers/study-info/class&course/class-controller');

    studentHandle_router.get('/',(req,res)=>res.status(200).json({authenticate:true,accessLevel:3}))
    studentHandle_router.get('/getClassById',getClassById);
    studentHandle_router.get('/getAllClasses',getAllClasses);
    studentHandle_router.get('/getSchedule',getStudentSchedule);
    studentHandle_router.get('/getCurriculum',getCurriculum);
    studentHandle_router.get('/getStudentRecord',getStudentRecord);
    studentHandle_router.post('/registerClass',registerClass);
    studentHandle_router.post('/classes.Find',findClassesByCondition);
    studentHandle_router.post('/getByCourseInfo',getClassesByCourse);
    studentHandle_router.delete('/removeClass',removeClass);
    
    module.exports = studentHandle_router;
