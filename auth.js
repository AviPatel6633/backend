const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserData = require('./modules/user');

const Authfunction = passport.use(new LocalStrategy(async (Username, Password, done) => {
  try {
    const user = await UserData.findOne({ username: Username });

    if (!user) {
      return done(null, false, { message: 'incorrect username' });
    }
    
    const isPasswordMatch = await user.comparePassword(Password);
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

