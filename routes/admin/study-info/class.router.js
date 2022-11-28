const {
    updateManyClasses,deleteClass,deleteManyClasses,
    getClassById,getAllClasses,findClassesByCondition
} = require('../../../controllers/study-info/class&course/class-controller');
const addClass = require('../../../controllers/study-info/class&course/class handle/addClass.controller');
const updateClass = require('../../../controllers/study-info/class&course/class handle/updateClass.controller');
const cancelClasses = require('../../../controllers/study-info/class&course/class handle/cancel class/cancelClasses.handle')
const class_router = require('express').Router();

class_router.get('/class/:id',getClassById);
class_router.get('/classes',getAllClasses);
class_router.post('/class/find',findClassesByCondition);
class_router.post('/addClass',addClass);
class_router.patch('/updateClass',updateClass);
class_router.patch('/updateClasses',updateManyClasses);
class_router.patch('/cancelClasses',cancelClasses);
class_router.delete('/deleleClass',deleteClass);
class_router.delete('/deleteClasses',deleteManyClasses);

module.exports = class_router;