const {addClass,updateClass,updateManyClasses,deleteClass,deleteManyClasses,getClassById,getAllClasses,findClasses} = require('../../../controllers/study-info/class&course/class-controller');
const class_router = require('express').Router();

class_router.get('/class/:id',getClassById);
class_router.get('/classes',getAllClasses);
class_router.post('/class/find',findClasses);
class_router.post('/addClass',addClass);
class_router.patch('/updateClass',updateClass);
class_router.patch('/updateClasses',updateManyClasses);
class_router.delete('/deleleClass',deleteClass);
class_router.delete('/deleteClasses',deleteManyClasses);

module.exports = class_router;