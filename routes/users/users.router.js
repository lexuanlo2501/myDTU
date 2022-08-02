const express = require('express');
const router = express.Router();
const root_router = require('../admin/admin.router');
const passport = require('passport');
const {handleRegister,handleLogout,userLoginSuccess,userLoginFailure} = require('../../controllers/user.handle');
const {checkAuthenticated,checkNotAuthenticated,isAdmin} = require('../../security/user.auth');



router.get('/user',checkAuthenticated,async(req,res)=>{
    res.json(req.user);
});
router.post('/login',checkNotAuthenticated,passport.authenticate('local',{  successRedirect: `/login/success`,failureRedirect: `/login/failure`}));

router.use('/login/success',userLoginSuccess);
router.use('/login/failure',userLoginFailure);
router.post('/register', checkNotAuthenticated, handleRegister );
router.post('/logout',handleLogout);
router.use('/root',isAdmin,root_router);
module.exports= router;