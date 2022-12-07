const 
    Users = require('../../models/users/users.mongo'),
    bcrypt = require('bcrypt'),
    RegisterLecturer = require('./register lecturer/lecturer.register'),
    RegisterStudent = require('./register student/student.register'),
    {IsRegisterable ,UserInfoExist,IsStudent,IsLecturer} = require('./register validate/register.validate');

const handleRegister = async(req,res)=>{
  try{
  const 
    UserData = req.body,
    { uid,full_name,email,password,gender, date_of_birth,PlaceOfBirth,role } = UserData,
      user = new Users({uid,full_name,email,password : await bcrypt.hash(password, 10),gender , date_of_birth , PlaceOfBirth , role }),
      {emailFound="", uidFound=""} =  await UserInfoExist({email,uid});
      switch(true){
        case(email.length ===0 || uid.length === 0 || password.length === 0 ):
          throw `Không thể đăng ký , thông tin sai định dạng`;

        case(!IsRegisterable(role)):
          throw `Không thể đăng ký với chức vụ hiện tại : ${role}`;
        
        case (emailFound.includes(email)):
          throw  `Email đã tồn tại , vui lòng thử lại bằng email khác`  ;
        
        case(uidFound.includes(uid)):
          throw `Mã định danh đã tồn tại , vui lòng thử lại bằng một mã khác`;
      
        case( IsStudent(role) ):
          await RegisterStudent(UserData,user);
        break;
        
        case( IsLecturer(role) ):
          await RegisterLecturer(UserData,user);
        break;
    }
    res.status(200).json({message:`Đã đăng ký thành công thông tin đăng nhập cho ${req.body.role} : ${req.body.full_name} với mã định danh : ${req.body.uid}`});
  }
  catch(e){
    console.log(e);
    res.status(400).json({
      errorMessage:`Đã có lỗi xảy ra trong quá trình đăng ký tài khoản vui lòng xem lại thông tin đăng ký và thử lại sau`,
      errorLog:e
  });
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
    if(req.user.role.includes('Giảng viên')) return res.redirect('/lecturer');
    return res.redirect('/student'); 
  }
  const userLoginFailure =(req,res)=>{
      const error =require('../../security/passport.config').err;
      res.status(401).json({errorMessage:error,authenticate:false});
      
  }
module.exports = {handleRegister,handleLogout,userLoginSuccess,userLoginFailure};
