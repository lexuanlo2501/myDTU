const bcrypt = require('bcrypt');
const passport = require('passport')
const generateUsers = require('../models/users.model')

const renderHomePage =  (req, res) => {
     res.render('index.ejs');
}
const renderLogin=(req,res)=>{
    res.render('login.ejs');
}
const renderRegister = (req,res)=>{
    res.render('register.ejs');
}
const PassportAuth = ()=>{
    return passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
      })
}


const handleLogout = (req,res)=>{
    req.logOut((error)=>{
        if(error) return next(error);
        res.redirect('/login');
    });
    
}
module.exports = {renderHomePage,renderLogin,renderRegister,PassportAuth,createUser,handleLogout}