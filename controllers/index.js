
const authentication = require('./authentication');
const userController = require('./userController');
const taskController = require('./taskController');
const taskItemController = require('./taskItemController');
const goalController = require('./goalController');
const habitController = require('./habitController');


module.exports = {
    authentication,
    userController,
    taskController,
    taskItemController,
    goalController,
    habitController
};