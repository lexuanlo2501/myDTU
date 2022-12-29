const 
    Curriculum = require('../../../models/users/Academic program/curiculum.mongo'),
    StudentRecord = require('../../../models/users/Student/student-record.mongo'),
    StudentSchedule = require('../../../models/users/Student/student.schedule'),
    User = require('../../../models/users/users.mongo')
    Student = require('../../../models/users/Student/student.mongo');


const getCurriculum = async (req,res)=>{
    const 
        {uid} = req.user,
        {study_major} = await Student.findOne({student_id:uid}).lean() || {},
        curriculum = await Curriculum.findOne({major:study_major}).lean() || {};
    res.status(200).json({...curriculum});
}

const getStudentRecord = async (req,res)=>{
    res.status(200).json({...await StudentRecord.findOne({_id:req.user._id}).lean() || {}});
}

const getStudentSchedule = async(req,res)=>{
    const {full_name, uid, place_of_birth, role} = req.user;
    res.status(200).json({...await StudentSchedule.findOne({student_id:req.user.uid}).lean() || {},full_name,uid,place_of_birth,role});
}

const getStudentInfo = async(req,res)=>{
    res.status(200).json({...await User.findById(req.user._id,'uid full_name email gender date_of_birth PlaceOfBirth role currentLivingArea').lean(),...await Student.findOne({_id:req.user._id}).lean() || {} });
}

const getRegisteredClasses = async(req,res)=>{
    const {class_registered} = await StudentSchedule.findOne({_id:req.user._id}).lean().populate( 'class_registered');
    res.status(200).json(class_registered);
}



module.exports = {getCurriculum,getStudentRecord,getStudentSchedule,getStudentInfo,getRegisteredClasses};