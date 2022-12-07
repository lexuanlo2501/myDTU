const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

module.exports.initializePassport = async(passport, getUserByEmail, getUserById)=> {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
       
      
      if (user == null) {
        module.exports.err = 'Người dùng Email này không tồn tại';
        return done(null, false);
      }
  
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null,user)
        } else {
         module.exports.err = `Mật khẩu của người dùng với email: ${user.email} không đúng`;
          return done(null, false);
        }
      } catch (e) {
        return done(e)
      }
      
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
      return done(null, await getUserById(id)) ;
    });
  }
  
  
  