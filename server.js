if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  const path = require('path');
  const express = require('express')
  const app = express()
  const bcrypt = require('bcrypt')
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')
  const Users = require('./models/users.mongo');
  const initializePassport = require('./security/passport-config');
  const mongoose = require('mongoose');
  
 app.use(express.json());
  const PORT=5000;
   initializePassport(
    passport,
    email=>Users.findOne({email:email}),
    id => Users.findOne({_id:id})
  );
  const CLIENT_URL = process.env.CLIENT_URL;

  
 // app.set('view-engine', 'ejs')
  app.use(express.urlencoded({ extended: false }))
  app.use(flash());
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))
  
  app.get('/', checkAuthenticated, async(req, res) => {
    console.log(req.user.id);
    res.redirect(`${process.env.CLIENT_URL}`);
  
    
 
});
app.get('/user',async (req,res)=>{
  const user = await Users.findById(req.user.id);
  res.json(user);
})
  
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/login`);
  });
  
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: `${CLIENT_URL}/login`,
    failureFlash: true
  }));
  
  app.get('/register', checkNotAuthenticated, (req, res) => {
      res.redirect(`${process.env.CLIENT_URL}/register`);
  });
  
  app.post('/register', checkNotAuthenticated, async (req, res) => {
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
     res.redirect(`${CLIENT_URL}/login`);
    }
    } catch (error){
      console.log(error);
      res.status(500).json({errorMessage:error.message});
     
    }
    
  })
  
  app.get('/logout', (req, res) => {
    req.logOut((err)=>{
      if(err) return next(err);
      res.redirect(`${CLIENT_URL}/logout`);

    });
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/login');
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }
  
mongoose.connect(process.env.MONGO_URL )
.then(()=>app.listen(PORT,()=>console.log(`Server running on PORT:${PORT}`)))
.catch((error)=>{
    console.log(error.message);
});
