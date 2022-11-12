if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  //const Class = require('./models/class&courses/classes.mongo');
  const Users = require('./models/users/users.mongo');
  const os = require('os');
  const express = require('express');
  const app = express();
  const session = require('express-session')
  const methodOverride = require('method-override')
  const mongoose = require('mongoose');
  const cors = require('cors');
  const passport = require('passport');
  const initializePassport = require('./security/passport.config').initializePassport;
  const router = require('./routes/users/users.router');
  const PORT=5000;
  const CLIENT_URL = process.env.CLIENT_URL;
  
  process.env.UV_THREADPOOL_SIZE = os.cpus().length; 
  initializePassport(passport,email=>Users.findOne({email:email}),id => Users.findOne({_id:id}));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie:{
        maxAge:30*60*1000
      }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(methodOverride('_method'));
    app.use(cors({origin:CLIENT_URL,methods: "GET,POST,PUT,DELETE",credentials: true,}));
    app.use((err,req,res,next)=>{
      if(err) return res.status(500).json({errorMesssage:err.type});
      next();
    });
    app.use('/',router);
    
    mongoose.connect(process.env.MONGO_URL )
    .then(()=>app.listen(PORT, async()=>{
         //console.log(await Class.find({semester:"Học Kỳ I", year:"Năm Học 2022-2023"}));
        console.log(`Server running on PORT:${PORT}`)}))
    .catch((error)=>{
      console.log(error.message);
    });
  
  
    
    
    
    
    
  
  
  

