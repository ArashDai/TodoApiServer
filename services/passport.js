const passport = require('passport');
const config = require('../config');
const user = require('../models').user;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//setup options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const localLogin = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pass'
  },
  (username, password, done) => {
    log.debug("Login process:", username);
    return user.findOne({where:{email,password}})  //changed User to user
      .then((result)=> {
        return done(null, result);
      })
      .catch((err) => {
        log.error("/login: " + err);
        return done(null, false, {message:'Wrong username or password'});
      });
});

//create jwt strategy

// const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
//   user.findById(payload.sub)
//     .then( user => done(null,user))
//     .catch( err => done(err, false))
// });

//************************************************************************************* */
//this code below must be broken and must be why i recieve 'unauthorized' on the client
//it isnt getting the correct input data!!!! 
// passport-jwt docs
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    //check payload to see if the userID is in the database
    //if it is call 'done' with that user
    //otherwise call done without the user object
    console.log('payload!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!') //last time payload was { iat: 1497585251463 }
    console.log(payload)
    console.log(payload.sub)
    user.findOne({where:{id:payload.sub}})
    .then(user => {
      if(!user) return done(null, false, {message:'sorry incorrect credentials'})
      done(null, user)
    })
    .catch(err => done(null, false, {message:'sorry please login'}))
});

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);