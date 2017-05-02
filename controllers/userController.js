const User = require('../models').User;
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
        
        return User
        .findOrCreate({where:{email, password},defaults:{
            email: email,
            password: password,
            schedule: req.body.schedule,
            activeGoals: req.body.activeGoals,
            activeTasks: req.body.activeTasks,
            completedTasks: req.body.completedTasks,
            completedGoals: req.body.completedGoals
        }})
        .then( user => res.status(201).send.json({ token:tokenGen(user) }))
        .catch( error => res.status(400).send(error))
    },
    retrieve(req, res) {
        return User
        .findById(req.params.userId)
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
        .findById(req.params.userId)
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
        .findById(req.params.userId)
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