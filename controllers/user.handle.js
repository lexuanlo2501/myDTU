const bcrypt = require('bcrypt');
const Users = require('../models/users.mongo');

handleRegister = async(req,res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        if(await Users.findOne({email:req.body.email}))   res.json({errorMessage:`Error , user's email  already exists`});
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
          } catch (error){
            return res.status(500).json({errorMessage:error.message});
          }
          res.status(200).json({message:'Bạn đã đăng ký thành công'});
        }
      } catch (error){
        console.log(error);
        res.status(500).json({errorMessage:error.message});
        }
    }
    const handleLogout = (req,res)=>{
      req.logOut((err)=>{
        if(err) return next(err);
        res.status(200).json({loggedout:true});
    });
  }
  const userLoginSuccess = (req,res,next)=>{
    console.log(req.user.role);
   if(req.user.role==='Admin') return res.redirect('/root');
    res.status(200).json({authenticate:true});
   
  }
  const userLoginFailure =(req,res)=>{
      let error =require('../security/passport.config').err;
      res.status(401).json({error});
      error = null;
  }
module.exports = {handleRegister,handleLogout,userLoginSuccess,userLoginFailure};
