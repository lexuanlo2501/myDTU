const {createClassTranscript,reviewClassTranscript} = require(`../../study-info/class&course/class handle/review class's transcript/transcript.review`);
const classAcademicTranscript = require('../../../models/class&courses/class.academic.transcript.mongo');


const addClassTranscript = async(req,res)=>{
    try{
        await createClassTranscript(req.user,req.body);
        res.status(200).json({message:`Đề cương bảng điểm của lớp ${req.body.class_id} ${req.body.semester} ${req.body.year} 
        đã được bạn thêm vào và đang đợi được phòng Đào Tạo phê duyệt`});
    }
    catch(e){
        res.status(500).json({errorMessage:`Không thể thêm để cương cho lớp ${req.body.class_id}`, errorLog:e});
    }
}

const verifyClassTranscript = async(req,res)=>{
    try{
    await reviewClassTranscript(req.user._id,req.body);
    res.status(200).json({message:`Đã duyệt thành công đề cương của lớp ${req.body.class_id}`});
    }
    catch(e){
        console.log(e);
        res.status(500).json({errorMessage:`Đã có lỗi xảy ra , vui lòng thử lại sau `, errorLog:e});
    }
}

const getClassTranscript = async(req,res)=>{
    res.status(200).json({...await classAcademicTranscript.find({...req.body}).lean()});
}

module.exports ={ addClassTranscript,verifyClassTranscript,getClassTranscript };