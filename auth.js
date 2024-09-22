const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserData = require('./modules/user');
const bcrypt = require('bcrypt');

const Authfunction = passport.use(new LocalStrategy(async (Username, Password, done) => {
    try {
      console.log("User Details", Username, Password);
      const user = await UserData.findOne({ Username });
  
      if (!user) {
        return done(null, false, { message: 'incorrect username' });
      }
  
      console.log("Username :" , Username);
      const isPasswordMatch = await bcrypt.compare(Password, user.password);
      // const isPasswordMatch = user.password == Password;
  
      if (isPasswordMatch) {
        return done(null, user); 
      } else {
        return done(null, false, { message: 'incorrect password' });
      }
  
    } catch (err) {
      return done(err);
    }
  }))

  module.exports = Authfunction;
  
//   const localAuthentication = passport.authenticate('local', {session: false});
