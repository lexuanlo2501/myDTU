const {addCourse,updateCourse,deleteCourse,getCourse,getAllCourses} = require('../../../controllers/study-info/course-controller');
const course_router = require('express').Router();

course_router.get('/course/:id',getCourse);
course_router.post('/addCourse',addCourse);
course_router.patch('/updateCourse/:id',updateCourse);
course_router.delete('/deleleCourse/:id',deleteCourse);
course_router.get('/courses',getAllCourses);

module.exports = course_router;