const Task = require('../models').Task;
const TaskItem = require('../models').TaskItem;
const Goal = require('../models').goal;

module.exports = {
        create(req,res){
            return Goal
            .create({
                creator: req.body.creator,
                goalId: req.body.goalId,
                name: req.body.name,
                description: req.body.description,
                tasks: req.body.tasks
            })
            .then( goal => res.status(201).send(goal))
            .catch( error => res.status(400).send(error));
        },
        list(req, res){
            return Goal
            .findAll({
                include:[{
                    model: Task,
                    as: 'tasks'
                }]
            })
        },
        retrieve(req,res){
            return Goal
            .findById(req.params.goalId,{
                include:[{
                    model: Task,
                    as: 'tasks'
                }]
            })
            .then( goal => {
                if(!goal)  return res.status(404).send({message:'Goal Not Found'});
                res.status(200).send(goal);
            })
            .catch( error => res.status(400).send(error));
        },
        update(req,res){
            return Goal
            .findById(req.params.goalId,{
                include:[{
                    model:Task,
                    as:'tasks'
                }]
            })
            .then( goal => {
                if(!goal) return res.status(400).send({message:'Goal Not Found'});
                return goal
                .update(req.body, {fields:Object.keys(req.body)})
                .then( goal => res.status(200).send(goal))
                .catch( error => res.status(400).send(error));
            })
            .catch( error => res.status(400).send(error));
        },
        destroy(req,res){
            return Goal
            .findOne({where:{id:req.params.goalId}})
            .then( goal => {
                if(!goal) return res.status(400).send({message:'Goal Not Found'})
                return goal
                .destroy()
                .then(() => res.status(200).send({message:'Goal Deleted Successfully'}))
                .catch( error => res.status(400).send(error));
            })
        }
};