const User = require('../models').User;
// update this controller, create signin controller or use auth controller
//bcrypt salt n hash password
module.exports = {
    create(req, res) {
        //first need to check for existing user! check for email in use!
        
        return User
        .findOrCreate({where:{email:req.body.email}},{
            email: req.body.email,
            password: req.body.password,
            schedule: req.body.schedule,
            activeGoals: req.body.activeGoals,
            activeTasks: req.body.activeTasks,
            completedTasks: req.body.completedTasks,
            completedGoals: req.body.completedGoals
        })
        .then( user => res.status(201).send(user))
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