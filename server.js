if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  //const Class = require('./models/class&courses/classes.mongo');
  const 
    Users = require('./models/users/users.mongo'),
    os = require('os'),
    express = require('express'),
    app = express(),
    session = require('express-session'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    passport = require('passport'),
    initializePassport = require('./security/passport.config').initializePassport,
    router = require('./routes/users/users.router'),
    PORT=process.env.PORT || 5000,
    server = require('http').createServer(app),
    {Server} = require('socket.io'),
    io = new Server(server),
    CLIENT_URL = process.env.CLIENT_URL;

  process.env.UV_THREADPOOL_SIZE = os.cpus().length; 
  initializePassport(passport,email=>Users.findOne({email:email}),id => Users.findOne({_id:id}));
  io.on('connection',(socket)=>{
    console.log('A user connected');
    const message = require('./routes/users/users.router');
    socket.emit('acknowledged','hello');
    
  })
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie:{
        maxAge:60*60*1000
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
    app.use((req,res,next)=>{
      res.io = io;
      next();
    });
    app.use(express.static(__dirname + '/public'));
    app.use('/',router);
    
    mongoose.connect(process.env.MONGO_URL )
    .then(()=>server.listen(PORT, async()=>{
      
      console.log(`Server running on PORT:${PORT}`);
      app.set('io',io);
      
    }))
    .catch((error)=>{
      console.log(error.message);
    });
  
  
    
    
    
    
    
  
  
  

