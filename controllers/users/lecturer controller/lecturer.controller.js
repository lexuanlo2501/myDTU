const {createClassTranscript,UpdateTranscript,reviewClassTranscript} = require(`../../study-info/class&course/class handle/review class's transcript/transcript.review`);
const classAcademicTranscript = require('../../../models/class&courses/class.academic.transcript.mongo');
const lecturerSchedule = require('../../../models/users/lecturer/lecturer.schedule');
const ScoreBoard = require('../../../models/class&courses/class.score-board');
const Class = require('../../../models/class&courses/classes.mongo');
const studentTranscriptRecord = require('../../../models/users/Student/student.class.grade.mongo');
const notifications = require('../../../models/users/Notifications/notifications');
const userNotification = require('../../../models/users/Notifications/user.notifications');
const QuestionsVault = require('../../../models/users/lecturer/lecturer.questions.mongo');
const User = require('../../../models/users/users.mongo');
const path = require('path');

const addClassTranscript = async(req,res)=>{
    try{
        await createClassTranscript(req.user,req.body);
        res.status(200).json({message:`Đề cương bảng điểm của lớp ${req.body.classData.class.class_id} ${req.body.classData.class.semester} ${req.body.classData.class.year} 
        đã được bạn thêm vào và đang đợi được phòng Đào Tạo phê duyệt`});
    }
    catch(e){
        res.status(500).json({errorMessage:`Không thể thêm để cương cho lớp ${req.body.class_id}`, errorLog:e});
    }
}

const updateClassTranscript = async(req,res)=>{
    try{
        await UpdateTranscript(req.user,req.body);
        res.status(200).json({message:`Đã sửa thành công đề cương lớp ${req.body.classData.class.class_id}`});
    }catch(e){
        res.status(500).json({errorMessage:"Có lỗi ! Không thể sửa đề cương", errorLog:e});
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
    let findResult = await classAcademicTranscript.findOne({"classData.class":req.params.id}).lean().populate({
        path:'classData.class',
        select:'class_id course_name semester year'
    });
    let transcriptResult = {};

    if(!findResult) {
        
        findResult = await Class.findById(req.params.id,'class_id course_id course_name lecturer').lean();
        const {_id,class_id,course_name,course_id,semester ,year} = findResult;
        transcriptResult = {
            classData:{
                class:{
                    _id,
                    course_name,
                    class_id,
                    semester ,
                    year

                },
                course_id
            },
            submitBy:{lecturer:{
                _id:req.user._id,
                full_name:req.user.full_name,
                uid:req.user.uid
            }
        },
            scoreTypes:[],
            status:"N/A"
        }
    }
    else transcriptResult = {...findResult};
   
   
    const submittedTranscripts = await classAcademicTranscript.find({"classData.course_id":transcriptResult.classData.course_id}).lean().populate(
        {
            path:'classData.class',
            select:'course_name class_id'
        }
    );
    //console.log({...transcriptResult,submittedTranscripts});
    res.status(200).json({...transcriptResult,submittedTranscripts});
}

const getSubscribedClasses = async (req,res)=>{
    const {class_registered = []} = await lecturerSchedule.findById(req.user._id).lean().populate({path:'class_registered',select:'class_id course_name'});
    res.status(200).json(class_registered);
}

const getTranscriptFile  = (req,res)=>{
    const {filePath,fileName} = req.body;
    try{
        
        res.status(200).download(path.join(__dirname,`../../../uploads/${filePath}/${fileName}`),`${fileName}`);
        console.log('Downloaded successfully');
    }
    catch(error){
        console.log(error);
        res.status(404).json({
            errorMessage:`Không tìm thấy file tại đường dẫn ${filePath}`,
            errorLog:error
        });
    }
}

const getStudentScore =async (req,res)=>{
    const {id} = req.params;
    let [result,transcript] = await Promise.all([
        ScoreBoard.findById(id).lean().populate('class','class_id'),
        classAcademicTranscript.findById(id).lean()
    ]);
    if(!result) {
        const result_replace = await classAcademicTranscript.findById(id,'classData scoreTypes').lean().populate('classData.class','class_id');
        result = {class:result_replace.classData.class,StudentScoresRecord:[]}
    };
    result = {...result,scoreTypes:transcript.scoreTypes}
    res.status(200).json(result);
}



async function ModifyStudentScore(StudentScoresRecord,NotificationContent,data,class_taken,req){
    for(let i = 0 ;i<StudentScoresRecord.length;i+=20){
        const students_chunk = StudentScoresRecord.slice(i,i+20);
        await Promise.all(students_chunk.map(async(studentRecord)=>{
            const {uid,ScoresRecord} = studentRecord;
            const {_id,full_name} = await User.findOne({uid:uid},'full_name').lean()
            const notification = new notifications({
                sender:req.user._id,
                receiver:_id,
                Type:`Điểm thành phần của ${full_name} lớp ${data.class.class_id}`,
                content:NotificationContent + `, sinh viên ${full_name} xem và kiểm tra lại nếu có gì sai sót thông báo lại với giảng viên phụ trách để được chỉnh sửa kịp thời`
            })
            let {scoreTypes} = await studentTranscriptRecord.findOne({student_id:uid,class_taken:class_taken}).lean();
            scoreTypes = scoreTypes.map(scoreValue=>{
                
                const result = ScoresRecord.find(data=>data.description.includes(scoreValue.description));
                const {value} = result || {}; 
                return {...scoreValue,student_grade:value};
            });
            //console.log('scoreTypes : ',scoreTypes);
            await studentTranscriptRecord.findOneAndUpdate({student_id:uid,class_taken:class_taken},{scoreTypes:scoreTypes});
            await notification.save();
            await userNotification.findByIdAndUpdate(_id,{$push:{ Notifications:notification._id}});
        }));
}
}




const addStudentScore = async (req,res)=>{
    try{
    const data = req.body;
    const {StudentScoresRecord} = data;
    const class_taken = data.class._id;
    const NotificationContent = `Điểm thành phần lớp ${data.class.class_id} đã được cập nhập`
    await ModifyStudentScore(StudentScoresRecord,NotificationContent,data,class_taken,req)
    const scoreBoard = new ScoreBoard({
        _id:data._id,
        class:class_taken,
        StudentScoresRecord:StudentScoresRecord
    });
    await scoreBoard.save();
    res.status(200).json({message:`Bạn đã nhập thành công điểm thành phần của lớp ${data.class.class_id}`});
    }catch(error){
        console.log(error);
        res.status(500).json({error});
    }
    
}

const UpdateStudentScore =async (req,res)=>{
    try{
    const {_id,modifiedScores} = req.body;
    const data = req.body;
    const class_taken = data.class._id;
    const NotificationContent = `Điểm thành phần tại lớp ${data.class.class_id} đã được cập nhập theo như yêu cầu của bạn`;
    await ModifyStudentScore(modifiedScores,NotificationContent,data,class_taken,req);
    const {StudentScoresRecord = []} = await ScoreBoard.findById(_id).lean() || {};
    modifiedScores.map(record=>{
        const result = StudentScoresRecord.find(studentRecord=>studentRecord.uid.includes(record.uid)) || {}; 
        result.ScoresRecord = record.ScoresRecord || [];
       
    });
    if(StudentScoresRecord.length!== 0) await ScoreBoard.findByIdAndUpdate(_id,{StudentScoresRecord});
    res.status(200).json({message:`Đã sửa thành công điểm thành phần của lớp ${data.class.class_id}`});
}
    catch(error){
        console.log(error);
        res.status(500).json({error});
    }
}

const GetQuestionVaults = async(req,res)=>{
    res.status(200).json(await QuestionsVault.find({submit_by:req.user._id}).lean());
}

const getQuestionVault = async(req,res)=>{
    res.status(200).json(await QuestionsVault.findById(req.params.id).lean()|| {});
}

const createQuestionVault = async (req,res)=>{
    const {vault_name,course_name} = req.body;
    try{
    const vault = new QuestionsVault({
        vault_name,course_name, submit_by:req.user._id
    });
    await vault.save();
    res.status(200).json({id:vault._id});
}   
    catch(error){
        console.log(error);
        res.status(500).json({errorMessage:`Có lỗi xảy ra , không thể lưu kho đề ${vault_name} của môn ${course_name}`})
    }
}

const deleteQuestionVault = async (req,res)=>{
    await QuestionsVault.findByIdAndDelete(req.params.id);
    res.status(200).json({message:`Đã xóa thành công`})
}

module.exports =
    { 
        addClassTranscript,updateClassTranscript,verifyClassTranscript,
        getClassTranscript,getSubscribedClasses,getTranscriptFile,
        getStudentScore,addStudentScore,UpdateStudentScore,
        GetQuestionVaults,getQuestionVault,createQuestionVault,deleteQuestionVault
    };

