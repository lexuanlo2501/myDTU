const bcrypt = require('bcrypt');
const Users = require('../../models/users/users.mongo');
const Student_Record = require('../../models/users/student-record.mongo');
const Student_Schedule = require('../../models/users/student.schedule');
const UserNotification = require('../../models/users/user.notifications');
handleRegister = async(req,res)=>{
    try {
        const {uid,full_name,email,password,gender,date_of_birth,PlaceOfBirth,role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        if(['Sinh viên','Giảng viên'].some(_role=>!role.includes(_role))) throw 'Không thể đăng ký';
        if(await Users.findOne({email}) ) return res.status(400).json({errorMessage:`Email người dùng đã tồn tại , vui lòng thử lại bằng email khác`});
        if(await Users.findOne({uid})) return res.status(400).json({errorMessage:`Mã định danh của người dùng này đã tồn tại , vui lòng thử lại bằng một mã khác`})
        
        const User = new Users({
              uid,full_name,email,
              password:hashedPassword,
              gender, date_of_birth,PlaceOfBirth,role
            });
        
            const userNotification = new  UserNotification(
              {
                _id:User._id,
                uid:User.uid
              }); 
        if(User.role.includes('Sinh viên')){
              User.study_major = req.body.study_major;
              const student_record = new Student_Record({
                _id:User._id,  
                student:User._id,
                student_id:User.uid,
                full_name:User.full_name
              });
             
              const user_schedule = new Student_Schedule({
                _id:User._id,
                student:User._id,
                student_id:User.uid,
                semester:"Học Kỳ I",
              
            });
            await  Promise.all([user_schedule.save(), student_record.save()],);
          }
          await Promise.all([User.save(),userNotification.save()]);
        
          res.status(200).json({message:'Bạn đã đăng ký thành công'});
        
      } catch (error){
          console.log(error);
          res.status(400).json({errorMessage:`Có lỗi khi đăng ký , vui lòng thử lại `, errorLog:error});
        }
    }
    const handleLogout = (req,res)=>{
      req.logOut((err)=>{
        if(err) return next(err);
        res.status(200).json({signed_out:true});
    });
  }
  const userLoginSuccess = (req,res)=>{
  
    if(req.user.role.includes('Admin')) return res.redirect('/root');
    if(req.user.role.includes('Giảng viên')) return res.redirect('/teacher')
    return res.redirect('/student'); 
  }
  const userLoginFailure =(req,res)=>{
      const error =require('../../security/passport.config').err;
      res.status(401).json({error,authenticate:false});
      
  }
module.exports = {handleRegister,handleLogout,userLoginSuccess,userLoginFailure};
