if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const express = require('express');
  const app = express();
  const session = require('express-session')
  const methodOverride = require('method-override')
  const mongoose = require('mongoose');
  const cors = require('cors');
  const cookieParser = require('cookie-parser');
  const passport = require('passport');
  const initializePassport = require('./security/passport.config').initializePassport;
  const Users = require('./models/users.mongo');
  const router = require('./routes/users/users.router');
app.use(express.json());
const PORT=5000;

    initializePassport(passport,email=>Users.findOne({email:email}),id => Users.findOne({_id:id}));
    app.use(cookieParser());
    app.use(session({
      secret: process.env.SESSION_SECRET,
      cookie:{maxAge:6000},
      resave: false,
      saveUninitialized: false
    }));
    
    
    const CLIENT_URL = process.env.CLIENT_URL;
    
    
    
      app.use(cors({origin:[`${CLIENT_URL}`,`${CLIENT_URL}/login`,`${CLIENT_URL}/register`],methods: "GET,POST,PUT,DELETE",credentials: true,}));
      app.use(express.urlencoded({ extended: false }));
      app.use(passport.initialize());
      app.use(passport.session());
      app.use(methodOverride('_method'));
      app.use('/',router);
      
  
  
  
mongoose.connect(process.env.MONGO_URL )
.then(()=>app.listen(PORT,()=>console.log(`Server running on PORT:${PORT}`)))
.catch((error)=>{
  console.log(error.message);
});

