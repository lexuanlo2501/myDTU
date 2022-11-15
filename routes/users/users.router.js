const express = require('express');
      passport = require('passport'),
      router = express.Router(),
      Root_router = require('../admin/admin.router'),
      studentHandleRouter = require('./student.handle.router'),
      {
         handleRegister,handleLogout,
         userLoginSuccess,userLoginFailure
      } = require('../../controllers/users/user.auth'),
      {
         checkAuthenticated,checkNotAuthenticated,
         isAdmin,isStudent} = require('../../security/user.auth'),
      {getNotifications} = require('../../controllers/users/user-info.controller');

router.get('/user',checkAuthenticated,async(req,res)=>{
   const {uid,full_name,email,gender,date_of_birth,PlaceOfBirth,role,study_major,teaching_record} = req.user._doc;
   const User_info = {
      uid,full_name,email,gender,date_of_birth,PlaceOfBirth
   }
   if(role.includes('Sinh viên')) User_info.study_major = study_major ;
   if(role.includes('Giảng viên')) User_info.teaching_record = teaching_record;
   
   res.status(200).json({...User_info});
});

router.get('/notifications',checkAuthenticated,getNotifications);
router.use('/login/success',userLoginSuccess);
router.use('/login/failure',userLoginFailure);
router.use('/student',checkAuthenticated,isStudent,studentHandleRouter);
router.use('/root',checkAuthenticated,isAdmin,Root_router);
router.post('/login',checkNotAuthenticated,passport.authenticate('local',{  successRedirect: `/login/success`,failureRedirect: `/login/failure`}));
router.post('/logout',handleLogout);
router.post('/register', checkNotAuthenticated, handleRegister);

module.exports= router;