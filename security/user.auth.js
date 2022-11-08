function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    
    res.status(401).json({message:'Bạn chưa đăng nhập hệ thống'});
  }
  
  function checkNotAuthenticated(req, res, next) {
    
    if (req.isAuthenticated()) {
      
      return res.status(200).redirect(`/`);
    }
    
    next()
  }
  function isAdmin(req,res,next){
    
    if(req.user.role.includes('Admin')) return next();
    return res.status(403).json({errorMessage:"Bạn không được cấp quyền truy cập nội dung này"});
    
  }

  function isStudent(req,res,next){
    
      if(req.user.role.includes('Sinh viên')) return next();
      return res.status(403).json({errorMessage:"Bạn không được cấp quyền truy cập nội dung này"});
    
  }

  function isTeacher(req,res,next){
    if(req.user.role.includes('Giảng viên')) return next();
    return res.status(403).json({errorMessage:"Bạn không được cấp quyền truy cập nội dung này"});
    
    
  }

  module.exports = {checkAuthenticated,checkNotAuthenticated,isAdmin,isStudent,isTeacher};