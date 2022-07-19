if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
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
  const PORT=3000;
  initializePassport(
    passport,
    email=>Users.findOne({email:email}),
    id => Users.findOne({_id:id})
  )
  
  const users = []
  
  app.set('view-engine', 'ejs')
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))
  
  app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
  })
  
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
  
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  
  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
  
  app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      if(await Users.findOne({email:req.body.email}))   res.send(`Error , user's email  already exists` );
      else{
      try{
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
      return res.send(error.message);
      
    }
     
      console.log(users);
      res.redirect('/login')
    }
    } catch (error){
      console.log(error);
      res.send(error);
      res.redirect('/register')
    }
    
  })
  
  app.delete('/logout', (req, res) => {
    req.logOut((err)=>{
      if(err) return next(err);
      res.redirect('/login')

    });
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
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
