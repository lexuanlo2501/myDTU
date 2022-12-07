const {addCourse,updateCourse,deleteCourse,getCourse,getAllCourses} = require('../../../controllers/study-info/class&course/course-controller');
const course_router = require('express').Router();

course_router.get('/course',getCourse);
course_router.post('/addCourse',addCourse);
course_router.patch('/updateCourse',updateCourse);
course_router.delete('/deleleCourse',deleteCourse);
course_router.get('/courses',getAllCourses);

module.exports = course_router;