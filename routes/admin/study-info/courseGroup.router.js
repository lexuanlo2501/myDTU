const {addCourseGroup,updateCourseGroup,deleteCourseGroup,getCourseGroup,getAllCourseGroups} = require('../../../controllers/study-info/class&course/courseGroup-controller');
const group_router = require('express').Router();

group_router.get('/courseGroup',getCourseGroup);
group_router.get('/groups',getAllCourseGroups);
group_router.post('/addCourseGroup',addCourseGroup);
group_router.patch('/updateCourseGroup',updateCourseGroup);
group_router.delete('/deleleCourseGroup',deleteCourseGroup);

module.exports = group_router;