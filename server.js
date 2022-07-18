if(process.env.NODE_ENV!== 'production'){
    require('dotenv').config();
}
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const initalizePassport  = require('./passport-config');
const PORT = 3000;
const users = [];
initalizePassport(passport, email=>
    users.find(user => user.email === email),
    id=> users.find(user=>user.id===id)
);
app.use(express.json());
app.use(express.urlencoded({
    extended:false,

}));
app.use(flash());
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view-engine', 'ejs');
app.get('/',(req,res)=>{
    res.render('index.ejs',{name:req.user.name});

});
app.get('/login', (req,res)=>{
    res.render('login.ejs');
});

app.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}));

app.get('/register',(req,res)=>{
    res.render('register.ejs');
});

app.post('/register',async(req,res)=>{
    try {
        const hashedPassword =  bcrypt.hash(req.body.password,10) ;
        users.push({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:(await hashedPassword).toString()
        });
        res.redirect('/login');
      } 
    catch  {
        res.redirect('/register');
    }

    console.log(users);
});

app.listen(PORT, (req,res)=>{
    console.log(`Listening on PORT:${PORT}...`);
});