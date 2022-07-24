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
  const cors = require('cors');
 app.use(express.json());
  const PORT=5000;
   initializePassport(
    passport,
    email=>Users.findOne({email:email}),
    id => Users.findOne({_id:id})
  );
  const CLIENT_URL = process.env.CLIENT_URL;

  
 //app.set('view-engine', 'ejs')
 app.use(
  cors({
    origin:[`${CLIENT_URL}`,`${CLIENT_URL}/login`,`${CLIENT_URL}/register`],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
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
// Phần comment không cần để ý
 /* app.get('/', checkAuthenticated, async(req, res) => {
    console.log('req.user = ',req.user);
    res.render('index.ejs');
});*/
app.get('/user',checkAuthenticated,async (req,res)=>{
  console.log(req.user);
  const userResponse = req.user;
  delete userResponse.password;
  res.json(req.user.email);
});
  
 /* app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render(`login.ejs`);
  });
  */
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: `/login/success`,
    failureRedirect: `/login/failure`,
    failureFlash: true
  }));
  
 /* app.get('/register', checkNotAuthenticated, (req, res) => {
      res.render(`register.ejs`);
  });*/
  app.get('/login/success',(req,res)=>{
    res.status(200).json({
      authenticate:true
    })
  });
  app.get('/login/failure',(req,res)=>{
      const [message] = req.flash().error
    res.status(401).json({
       message
    });
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
  
  app.post('/logout', (req, res) => {
    req.logOut((err)=>{
      if(err) return next(err);
      res.json({authenticate:false});

    });
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
  
    res.status(401).json({message:'User is not authenticated !'});
  }
  
  function checkNotAuthenticated(req, res, next) {
    console.log(req.body);
    if (req.isAuthenticated()) {
      
      return res.status(200).redirect(`/user`);
    }

    next()
  }
  
mongoose.connect(process.env.MONGO_URL )
.then(()=>app.listen(PORT,()=>console.log(`Server running on PORT:${PORT}`)))
.catch((error)=>{
    console.log(error.message);
});
