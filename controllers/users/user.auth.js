const bcrypt = require('bcrypt');
const Users = require('../../models/users/users.mongo');
const UserSchedule = require('../../models/users/user.schedule');
handleRegister = async(req,res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        if(await Users.findOne({email:req.body.email}))   res.json({errorMessage:`Email người dùng đã tồn tại , vui lòng thử lại bằng email khác`});
        else{
          try{
            console.log(req.body);
            const User = new Users({
              _id: req.body.Student_id,
              full_name: req.body.name,
              email: req.body.email,
              password: hashedPassword,
              gender:req.body.gender,
              date_of_birth:req.body.date_of_birth,
              PlaceOfBirth:req.body.PlaceOfBirth,
              study_major:req.body.study_major
              
            });
            await User.save();
            const user_schedule = new UserSchedule({
              _id:User._id,
              full_name:User.full_name,
              semester:"Học kỳ I",
              
            });
            await  user_schedule.save();
          } catch (error){
            return res.status(400).json({errorMessage:error.message});
          }
          res.status(200).json({message:'Bạn đã đăng ký thành công'});
        }
      } catch (error){
        console.log(error);
        res.status(400).json({errorMessage:`Có lỗi khi đăng ký , vui lòng thử lại : ${error.message}`});
        }
    }
    const handleLogout = (req,res)=>{
      req.logOut((err)=>{
        if(err) return next(err);
        res.status(200).json({loggedout:true});
    });
  }
  const userLoginSuccess = (req,res)=>{
    if(req.user.role==='Admin') return res.redirect('/root');
     return res.status(200).json({message:'Chào mừng bạn trở lại'});
  }
  const userLoginFailure =(req,res)=>{
      let error =require('../../security/passport.config').err;
      res.status(401).json({error});
      error = null;
  }
module.exports = {handleRegister,handleLogout,userLoginSuccess,userLoginFailure};
