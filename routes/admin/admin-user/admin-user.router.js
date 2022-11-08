const {getAllUsers,findUsers,getUserById,modifyUser,patchManyUsers,deleteUser,deleteManyUsers} = require('../../../controllers/users/user-controller');
const user_router = require('express').Router();

user_router.get('/user/all',getAllUsers);
user_router.post('/users/find',findUsers);
user_router.patch('/updateUser',modifyUser);
user_router.patch('/updateMany',patchManyUsers);
user_router.delete('/deleteUser',deleteUser);
user_router.delete('/deleteUsers',deleteManyUsers);

module.exports = user_router;