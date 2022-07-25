function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    
    res.status(401).json({message:'User is not authenticated !'});
  }
  
  function checkNotAuthenticated(req, res, next) {
    // console.log(req.session);
    if (req.isAuthenticated()) {
      
      return res.status(200).redirect(`/user`);
    }
    
    next()
  }

  module.exports = {checkAuthenticated,checkNotAuthenticated};