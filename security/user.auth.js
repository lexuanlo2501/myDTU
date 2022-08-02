function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    
    res.status(401).json({message:'User is not authenticated !'});
  }
  
  function checkNotAuthenticated(req, res, next) {
    
    if (req.isAuthenticated()) {
      
      return res.status(200).redirect(`/user`);
    }
    
    next()
  }
  function isAdmin(req,res,next){
    try{
    if(req.user.role === 'Admin') return next();
     
    return res.redirect('/user');
    } catch{
      return res.json({errorMessage:"Bạn chưa đăng nhập hoặc không được cấp quyền truy cập nội dung này"});
    }
  }

  module.exports = {checkAuthenticated,checkNotAuthenticated,isAdmin};