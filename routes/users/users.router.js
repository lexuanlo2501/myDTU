const 
    express = require('express'),
    router = express.Router(),
    Root_router = require('../admin/admin.router'),
    studentHandleRouter = require('./student.handle.router'),
    {getNotifications} = require('../../controllers/users/user-info.controller'),
    {handleRegister,handleLogout,userLoginSuccess,userLoginFailure} = require('../../controllers/users/user.auth'),
    {checkAuthenticated,checkNotAuthenticated,isAdmin,isStudent,isTeacher} = require('../../security/user.auth'),
    lecturerRouter = require('./lecturer.router'),
    passport = require('passport'),
    path = require('path');


router.get('/',(req,res)=>{

    res.sendFile(path.join(__dirname,'../../public','index.html'));
    res.io.emit('sendfile',{message:`File sended`});
});
router.post('/message',(req,res)=>{
    console.log('ok');
    res.io.emit('acknowledged','da nhan duoc tin nhan tu client');
    
});
router.get('/notifications',checkAuthenticated,getNotifications);
router.get('/logout',handleLogout);
router.use('/login/success',userLoginSuccess);
router.use('/login/failure',userLoginFailure);
router.use('/lecturer',checkAuthenticated,isTeacher,lecturerRouter);
router.use('/student',checkAuthenticated,isStudent,studentHandleRouter);
router.use('/root',checkAuthenticated,isAdmin,Root_router);
router.post('/login',checkNotAuthenticated,passport.authenticate('local',{  successRedirect: `/login/success`,failureRedirect: `/login/failure`}));
router.post('/register', checkNotAuthenticated, handleRegister);
router.get('/auth',(req,res)=>{
    if(req.isAuthenticated()) return res.sendStatus(200);
    return res.sendStatus(401);
});
module.exports= router;