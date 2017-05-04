const User = require('../models').user;
const jwt = require('jwt-simple');
const config = require('../config');
// update this controller, create signin controller or use auth controller

function tokenGen(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub:user.id, iat:timestamp }, config.secret);
}
module.exports = {
    signup(req, res) {
        console.log('REQUEST!!!!!!!!!!!',req)
        const email = req.body.email;
        const password = req.body.password;
        if(!email || !password)  return res.status(422).send({error:'You must provide both Email and Password'});
        //specify unique for email in .create() also something below this line is not working
        return User
        .create({email: email,
                password: password})
        .then( user => res.status(201).send({ token:tokenGen(User) }))
        .catch( error => res.status(400).send(error))
    },
    signin(req,res){
        console.log('REQUESTTTTTTTTTTTTTT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',req.body)
        return User
        .findOne({where:{email:req.body.email}})
        .then((user) => {
            if(user && user.validatePassword(req.body.password)){
                console.log('THIS IS SIGNIN')
                res.status(201).send({ token:tokenGen(User)})
            } else {
                res.status(400).send({message:'wrong password'})
            }
        })
        .catch(err => res.status(400).send({message:err}))
    },
    retrieve(req, res) {
        return User
        .findById(req.params.id)
        .then(user => {
            if(!user){
                return res.status(404).send({
                    message: 'User Not Found'
                });
            }
            return res.status(200).send(user);
        })
        .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return User
        .findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found',
                });
            }
            return user
            .update(req.body, {fields:Object.keys(req.body)})
            .then((user) => res.status(200).send(user))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
        return User
        .findById(req.params.id)
        .then(user => {
            if (!user){
                return res.status(400).send({
                    message: 'User Not Found',
                });
            }
            return user
                .destroy()
                .then(() => res.status(204).send())
                .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
}