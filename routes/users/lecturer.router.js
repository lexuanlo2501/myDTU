const 
    lecturerRouter = require('express').Router(),
    {addClassTranscript} = require('../../controllers/users/lecturer controller/lecturer.controller');

    lecturerRouter.get('/',(req,res)=>{res.status(200).json({authenticate:true,accessLevel:2})});
    lecturerRouter.post('/addTranscript',addClassTranscript);

module.exports = lecturerRouter;