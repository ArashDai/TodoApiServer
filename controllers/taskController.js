const Task = require('../models').Task;
const TaskItem = require('../models').TaskItem;

module.exports = {
        create(req,res){
            return Task
            .create({
                creator: req.body.creator,
                taskId: UUIDV4(),
                name: req.body.name,
                description: req.body.description,
                taskItems: req.body.taskItems
            })
            .then( task => res.status(201).send(task))
            .catch( error => res.status(400).send(error));
        },
        list(req, res){
            return Task
            .findAll({
                include:[{
                    model: TaskItem,
                    as: 'taskItems'
                }]
            })
        },
        retrieve(req,res){
            return Task
            .findById(req.params.taskId,{
                include:[{
                    model: TaskItem,
                    as: 'taskItems'
                }]
            })
            .then( task => {
                if(!task)  return res.status(404).send({message:'Task Not Found'});
                res.status(200).send(todo);
            })
            .catch( error => res.status(400).send(error));
        },
        update(req,res){
            return Task
            .findById(req.params.taskId,{
                include:[{
                    model:TaskItem,
                    as:'taskItems'
                }]
            })
            .then( task => {
                if(!task) return res.status(400).send({message:'Task Not Found'});
                return task
                .update(req.body, {fields:Object.keys(req.body)})
                .then( task => res.status(200).send(task))
                .catch( error => res.status(400).send(error));
            })
            .catch( error => res.status(400).send(error));
        },
        destroy(req,res){
            return Task
            .findById(req.params.taskId)
            .then( task => {
                if(!task) return res.status(400).send({message:'Task Not Found'})
                return task
                .destroy()
                .then(() => res.status(200))
                .catch( error => res.status(400).send(error));
            })
        }
};