const express = require('express');
const router = express.Router();
const root_router = require('../admin/admin.router');
const passport = require('passport');
const {handleRegister,handleLogout,userLoginSuccess,userLoginFailure} = require('../../controllers/users/user.auth');
const {checkAuthenticated,checkNotAuthenticated,isAdmin,isStudent} = require('../../security/user.auth');
const studentHandle_router = require('./student.handle.router');


router.get('/user',checkAuthenticated,async(req,res)=>{
   const {uid,full_name,email,gender,date_of_birth,PlaceOfBirth,role,study_major,teaching_record} = req.user._doc;
   const User_info = {
      uid,full_name,email,gender,date_of_birth,PlaceOfBirth
   }
   if(role.includes('Sinh viên')) User_info.study_major = study_major ;
   if(role.includes('Giảng viên')) User_info.teaching_record = teaching_record;
   
   res.status(200).json({...User_info});
});
router.post('/login',checkNotAuthenticated,passport.authenticate('local',{  successRedirect: `/login/success`,failureRedirect: `/login/failure`}));

router.use('/login/success',userLoginSuccess);
router.use('/login/failure',userLoginFailure);
router.post('/register', checkNotAuthenticated, handleRegister );
router.post('/logout',handleLogout);
router.use('/root',checkAuthenticated,isAdmin,root_router);
//router.use()
router.use('/',checkAuthenticated,isStudent,studentHandle_router);
module.exports= router;