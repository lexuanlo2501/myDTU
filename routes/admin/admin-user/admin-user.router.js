const {getAllUsers,findUsers,getUserById,modifyUser,patchManyUsers,deleteUser,deleteManyUsers} = require('../../../controllers/users/user-controller');
const user_router = require('express').Router();

user_router.get('/user/:id',getUserById);
user_router.get('/user.all',getAllUsers);
user_router.post('/users.find',findUsers);
user_router.patch('/updateUser/:id',modifyUser);
user_router.patch('/updateMany',patchManyUsers);
user_router.delete('/deleteUser/:id',deleteUser);
user_router.delete('/deleteUsers',deleteManyUsers);

module.exports = user_router;