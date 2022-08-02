const express = require('express');
const Root_router = express.Router();
const {
    addClass,updateClass,
    deleteClass,getClass,
    addCourseGroup,updateCourseGroup,
    deleteCourseGroup,getCourseGroup,
    addCourse,updateCourse,
    deleteCourse,getCourse,
    getAllClasses,getAllCourses,getAllCourseGroups
    } = require('../../controllers/admin.controller');
Root_router.get('/',(req,res)=>{
    res.json({message:`Chào mừng ${req.user.role} trở lại`});
});
Root_router.get('/courseGroup/:id',getCourseGroup);
Root_router.post('/addCourseGroup',addCourseGroup);
Root_router.patch('/updateCourseGroup/:id',updateCourseGroup);
Root_router.delete('/deleleCourseGroup/:id',deleteCourseGroup);

Root_router.get('/course/:id',getCourse);
Root_router.post('/addCourse',addCourse);
Root_router.patch('/updateCourse/:id',updateCourse);
Root_router.delete('/deleleCourse/:id',deleteCourse);

Root_router.get('/class/:id',getClass);
Root_router.post('/addClass',addClass);
Root_router.patch('/updateClass/:id',updateClass);
Root_router.delete('/deleleClass/:id',deleteClass);

Root_router.get('/getAllCoures',getAllCourses);
Root_router.get('/getAllClasses',getAllClasses);
Root_router.get('/getAllCourseGroups',getAllCourseGroups);


module.exports = Root_router;