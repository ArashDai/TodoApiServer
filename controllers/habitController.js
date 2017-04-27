const Habit = require('../models').Habit;
const Task = require('../models').Task;
const Goal = require('../models').Goal;

module.exports = {
        create(req,res){
            return Habit
            .create({
                creator: req.body.creator,
                habitId: UUIDV4(),
                name: req.body.name,
                description: req.body.description,
                tasks: req.body.tasks,
                goals: req.body.goals,
                priority: req.body.priority,
                frequency: req.body.frequency,
                active: req.body.active
            })
            .then( habit => res.status(201).send(habit))
            .catch( error => res.status(400).send(error));
        },
        list(req, res){
            return Habit
            .findAll({
                include:[{
                    model: Habit,
                    as: 'habits'
                }]
            })
        },
        retrieve(req,res){
            return Habit
            .findById(req.params.habitId,{
                include:[{
                    model: Task,
                    as: 'tasks'
                },{
                    model: Goal,
                    as: 'goals'
                }]
            })
            .then( habit => {
                if(!habit)  return res.status(404).send({message:'Habit Not Found'});
                res.status(200).send(habit);
            })
            .catch( error => res.status(400).send(error));
        },
        update(req,res){
            return Goal
            .findById(req.params.goalId,{
                include:[{
                    model:Task,
                    as:'tasks'
                },{
                    model: Goal,
                    as: 'goals'
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
            .findById(req.params.goalId)
            .then( goal => {
                if(!goal) return res.status(400).send({message:'Goal Not Found'})
                return goal
                .destroy()
                .then(() => res.status(200))
                .catch( error => res.status(400).send(error));
            })
        }
};