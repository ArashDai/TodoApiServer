TaskItem = require('../models').taskItem;

module.exports = {
    create(req,res){
        return TaskItem
        .create({
            taskId: req.body.taskId,
            name: req.body.name,
            description: req.body.description,
        })
        .then( taskItem => res.status(200).send(taskItem))
        .catch(error => res.status(400).send(error));
    },
    update(req,res){
        return TaskItem
        .find({
            where:{
                id: req.params.taskItemId,
                taskId: req.params.taskId
            }
        })
        .then( taskItem => {
            if(!taskItem) return res.status(400).send({message:'TaskItem Not Found'});

            return taskItem
            .update( req.body, {fields:Object.keys(req.body)})
            .then( taskItem => res.status(200).send(taskItem))
            .catch(errors => res.status(400).send(error));
        })
        .catch(error=> res.status(400).send(error));
    },
    destroy(req,res){
        return TaskItem
        .find({
            where:{
                id: req.params.taskItemId,
                taskId: req.params.taskId
            }
        })
        .then(taskItem => {
            if(!taskItem) return res.status(400).send({message:'TaskItem Not Found'});
         
            return taskItem
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
        .catch( error => res.staatus(400).send(error));
    }
};