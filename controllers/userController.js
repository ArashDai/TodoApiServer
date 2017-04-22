const User = require('../models').User;
// update this controller, create signin controller
//bcrypt salt n hash password
module.exports = {
    create(req, res) {
        return User
        .create({
            userId: req.body.userId,
            email: req.body.email,
            password: req.body.password,
            schedule: req.body.schedule,
            activeGoals: req.body.activeGoals,
            activeTasks: req.body.activeTasks,
            completedTasks: req.body.completedTasks,
            completedGoals: req.body.completedGoals
        })
        .then( todo => res.status(201).send(todo))
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