const 
    lecturerRouter = require('express').Router(),
    {addClassTranscript,getClassTranscript,getSubscribedClasses} = require('../../controllers/users/lecturer controller/lecturer.controller');

    lecturerRouter.get('/',(req,res)=>{res.status(200).json({authenticate:true,accessLevel:2,avt_src:req.user.avt_src})});
    lecturerRouter.get('/lecturerClasses',getSubscribedClasses);
    lecturerRouter.get('/getClassTranscript/:id',getClassTranscript);
    lecturerRouter.post('/addTranscript',addClassTranscript);

module.exports = lecturerRouter;