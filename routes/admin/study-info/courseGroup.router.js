const {addCourseGroup,updateCourseGroup,deleteCourseGroup,getCourseGroup,getAllCourseGroups} = require('../../../controllers/study-info/courseGroup-controller');
const group_router = require('express').Router();

group_router.get('/courseGroup/:id',getCourseGroup);
group_router.get('/groupsAll',getAllCourseGroups);
group_router.post('/addCourseGroup',addCourseGroup);
group_router.patch('/updateCourseGroup/:id',updateCourseGroup);
group_router.delete('/deleleCourseGroup/:id',deleteCourseGroup);

module.exports = group_router;