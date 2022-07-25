const express = require('express');
const router = express.Router();
const passport = require('passport');
const {handleRegister,handleLogout,userLoginSuccess,userLoginFailure} = require('../../controllers/user.handle');
const {checkAuthenticated,checkNotAuthenticated} = require('../../security/user.auth');
const {initializePassport} = require('../../security/passport.config');
const Users = require('../../models/users.mongo');


router.get('/user',checkAuthenticated,async(req,res)=>{
    res.json(req.user.email);
});
router.post('/login',checkNotAuthenticated,passport.authenticate('local',{  successRedirect: `/login/success`,failureRedirect: `/login/failure`}));

router.use('/login/success',userLoginSuccess);
router.use('/login/failure',userLoginFailure);
router.post('/register', checkNotAuthenticated, handleRegister );
router.post('/logout',handleLogout);

module.exports= router;