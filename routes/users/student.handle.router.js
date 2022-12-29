const 
    studentHandle_router = require('express').Router(),
    {getCurriculum,getStudentRecord,getStudentSchedule,getRegisteredClasses,getStudentInfo} = require('../../controllers/study-info/student study info/studentInfo.handle'),
    {registerClass,removeClass} = require('../../controllers/user-class.handle/user-class.controller'),
    {getClassById,getClassesByCourse,getAllClasses,findClassesByCondition ,getAllCourseGroup} = require('../../controllers/study-info/class&course/class-controller');
    
    studentHandle_router.get('/',(req,res)=>res.status(200).json({authenticate:true,accessLevel:3,avt_src:req.user.avt_src}));
    studentHandle_router.get('/getRegisteredClasses',getRegisteredClasses);
    studentHandle_router.get('/getClassById/:id',getClassById);
    studentHandle_router.get('/getAllClasses',getAllClasses);
    studentHandle_router.get('/getSchedule',getStudentSchedule);
    studentHandle_router.get('/getCurriculum',getCurriculum);
    studentHandle_router.get('/getStudentRecord',getStudentRecord);
    studentHandle_router.get('/getAllCourseGroup',getAllCourseGroup);
    studentHandle_router.get('/studentInfo',getStudentInfo);
    studentHandle_router.post('/registerClass',registerClass);
    studentHandle_router.post('/findClasses',findClassesByCondition);
    studentHandle_router.post('/getByCourseInfo',getClassesByCourse);
    studentHandle_router.delete('/removeClass',removeClass);
    
    module.exports = studentHandle_router;
