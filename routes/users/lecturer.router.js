const 
    lecturerRouter = require('express').Router(),
    {   addClassTranscript,updateClassTranscript,getClassTranscript,
        getSubscribedClasses,getTranscriptFile,getStudentScore,addStudentScore,UpdateStudentScore,
        GetQuestionVaults,getQuestionVault,createQuestionVault,deleteQuestionVault
    } = require('../../controllers/users/lecturer controller/lecturer.controller');

    lecturerRouter.get('/',(req,res)=>{res.status(200).json({authenticate:true,accessLevel:2,avt_src:req.user.avt_src})});
    lecturerRouter.get('/lecturerClasses',getSubscribedClasses);
    lecturerRouter.get('/getClassTranscript/:id',getClassTranscript);
    lecturerRouter.get('/getStudentScore/:id',getStudentScore);
    lecturerRouter.get('/getSumittedQuestionVault',GetQuestionVaults);
    lecturerRouter.get('/getQuestionVault/:id',getQuestionVault);
    lecturerRouter.post('/createQuestionVault',createQuestionVault);
    lecturerRouter.post('/addStudentsScoreRecord',addStudentScore)
    lecturerRouter.post('/downloadTranscriptFile',getTranscriptFile);
    lecturerRouter.post('/addTranscript',addClassTranscript);
    lecturerRouter.patch('/updateTranscript',updateClassTranscript);
    lecturerRouter.patch('/updateStudentScores',UpdateStudentScore);
    

module.exports = lecturerRouter;