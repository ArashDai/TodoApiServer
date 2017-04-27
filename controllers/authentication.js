const User = require('../models').User;
const jwt = require('jwt-simple');
const config = require('../config');
const bcrypt  = require('bcrypt-nodejs');

function tokenGen(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub:user.id, iat:timestamp }, config.secret);
}

exports.signin = function(req, res, next){
    res.send({ token:tokenGen(req.user) });
}

exports.signup = function(req,res,next){
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(422).send({error:'You must provide both Username and Password'});
    }
    // Check if user with given username exists
    User.findOne({where:{email}}, function(err,existingUser){
        if (err) return next(err); 
        //if a user with this email does exist return an error
        if(existingUser) {
            return res.status(422).send({error:'Email in use'}); 
        }
        //if a user with this email does not exist, create record and save user
        //salt and hash password here then pass it to the user controller to create and save the user
        bcrypt.genSalt(10, function(err, salt){
            if(err) return next(err); 
            bcrypt.hash(req.body.password, salt, null, function(err, hash){
            if(err) return next(err);
            req.body.password = hash;
            next(); 
            })
        });

        User.create(req)
        //
        // const user = new User({
        //     email:email,
        //     password:password 
        // });
        // user.save(function(err){
        //     if(err) return next(err);
        //     res.json({ token:tokenGen(user) });
        // });
    });
}