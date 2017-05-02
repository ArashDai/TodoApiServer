const passport = require('passport');
const config = require('../config');
const User = require('../models').User;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localLogin = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pass'
  },
  (username, password, done) => {
    log.debug("Login process:", username);
    return User.findOne({where:{email,password}})
      .then((result)=> {
        return done(null, result);
      })
      .catch((err) => {
        log.error("/login: " + err);
        return done(null, false, {message:'Wrong username or password'});
      });
});

//setup options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

//create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions,function(payload, done){
    //check payload to see if the userID is in the database
    //if it is call 'done' with that user
    //otherwise call done without the user object
    User.findOne({where:{id:payload.sub}})
    .then(user => done(null, user))
    .catch(err => done(null, false, {message:'sorry please login'}))
});

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);