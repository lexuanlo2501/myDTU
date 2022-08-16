const express = require('express');
const router = express.Router();
const root_router = require('../admin/admin.router');
const passport = require('passport');
const {handleRegister,handleLogout,userLoginSuccess,userLoginFailure} = require('../../controllers/users/user.auth');
const {checkAuthenticated,checkNotAuthenticated,isAdmin,isStudent} = require('../../security/user.auth');
const studentHandle_router = require('./student.handle.router');
//const {generateSchedule} = require('../../controllers/user-class.handle/user-class.controller');

router.get('/user',checkAuthenticated,async(req,res)=>{
   res.status(200).json({...req.user._doc, password:undefined, __v:undefined});
});
router.post('/login',checkNotAuthenticated,passport.authenticate('local',{  successRedirect: `/login/success`,failureRedirect: `/login/failure`}));

router.use('/login/success',userLoginSuccess);
router.use('/login/failure',userLoginFailure);
router.post('/register', checkNotAuthenticated, handleRegister );
router.post('/logout',handleLogout);
router.use('/root',isAdmin,root_router);
router.use('/',isStudent,studentHandle_router);
module.exports= router;