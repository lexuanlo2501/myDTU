const express = require('express'),
      passport = require('passport'),
      router = express.Router(),
      Root_router = require('../admin/admin.router'),
      studentHandleRouter = require('./student.handle.router'),
      {getNotifications} = require('../../controllers/users/user-info.controller'),
      {handleRegister,handleLogout,userLoginSuccess,userLoginFailure} = require('../../controllers/users/user.auth'),
      {checkAuthenticated,checkNotAuthenticated,isAdmin,isStudent} = require('../../security/user.auth');



router.get('/notifications',checkAuthenticated,getNotifications);
router.get('/logout',handleLogout);
router.use('/login/success',userLoginSuccess);
router.use('/login/failure',userLoginFailure);
router.use('/student',checkAuthenticated,isStudent,studentHandleRouter);
router.use('/root',checkAuthenticated,isAdmin,Root_router);
router.post('/login',checkNotAuthenticated,passport.authenticate('local',{  successRedirect: `/login/success`,failureRedirect: `/login/failure`}));
router.post('/register', checkNotAuthenticated, handleRegister);

module.exports= router;