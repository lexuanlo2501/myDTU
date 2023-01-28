const 
    path = require('path'),
    User = require('../../models/users/users.mongo'),
    express = require('express'),
    router = express.Router(),
    Root_router = require('../admin/admin.router'),
    studentHandleRouter = require('./student.handle.router'),
    {getNotifications,markNotification} = require('../../controllers/users/user-info.controller'),
    {handleRegister,handleLogout,userLoginSuccess,userLoginFailure} = require('../../controllers/users/user.auth'),
    {checkAuthenticated,checkNotAuthenticated,isAdmin,isStudent,isTeacher} = require('../../security/user.auth'),
    lecturerRouter = require('./lecturer.router'),
    passport = require('passport'),
    multer = require('multer'),
    storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path.join(__dirname,'../../public'));
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        }
    }),
    upload = multer({storage});


router.get('/',(req,res)=>{

    res.sendFile(path.join(__dirname,'../../public','index.html'));
    res.io.emit('sendfile',{message:`File sended`});
});
router.post('/message',(req,res)=>{
    console.log('ok');
    res.io.emit('acknowledged','da nhan duoc tin nhan tu client');
    
});
router.post('/uploadProfilePicture',upload.single('avatar'),async(req,res)=>{
    try{
    console.log(req.file);
    await User.findByIdAndUpdate(req.user._id,{avt_src:`${req.file.filename}`});
    res.status(200).json({avt_src:req.file.filename});
    }
    catch(e){
        console.log(e)
        res.status(500).json({...e});
    }
})

router.get('/notifications',checkAuthenticated,getNotifications);
router.get('/logout',handleLogout);
router.use('/login/success',userLoginSuccess);
router.use('/login/failure',userLoginFailure);
router.use('/lecturer',checkAuthenticated,isTeacher,lecturerRouter);
router.use('/student',checkAuthenticated,isStudent,studentHandleRouter);
router.use('/root',checkAuthenticated,isAdmin,Root_router);
router.post('/login',checkNotAuthenticated,passport.authenticate('local',{  successRedirect: `/login/success`,failureRedirect: `/login/failure`}));
router.post('/register', checkNotAuthenticated, handleRegister);
router.post('markNotification:id',markNotification);
router.get('/auth',(req,res)=>{
    if(req.isAuthenticated()) return res.sendStatus(200);
    return res.sendStatus(401);
});


module.exports= router;