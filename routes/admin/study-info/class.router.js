const {addClass,updateClass,updateManyClasses,deleteClass,deleteManyClasses,getClass,getAllClasses,findClasses} = require('../../../controllers/study-info/class-controller');
const class_router = require('express').Router();

class_router.get('/class/:id',getClass);
class_router.get('/classes',getAllClasses);
class_router.post('/class.find',findClasses);
class_router.post('/addClass',addClass);
class_router.patch('/updateClass/:id',updateClass);
class_router.patch('/updateClasses',updateManyClasses);
class_router.delete('/deleleClass/:id',deleteClass);
class_router.delete('/deleteClasses',deleteManyClasses);

module.exports = class_router;