const passport = require('passport');
const passportService = require('./services/passport');

const taskController = require('./controllers').taskController;
const taskItemController = require('./controllers').taskItemController;
const goalController = require('./controllers').goalController;
const userController = require('./controllers').userController;

const requireAuth = passport.authenticate('jwt', {session:false});//this is not working
const requireSignin = passport.authenticate('local', {session:false});//Im assuming this does not work either need to fix passport


module.exports = (app) => {
    app.get('/', requireAuth, (req,res) => {res.status(200).send({message:'hello world'});});
    //app.post('/signin', requireSignin, userController.signin );
    app.post('/signup', userController.signup);
    app.post('/signin', userController.signin);
    //make routes for goals and habits
    app.post('/api/tasks', taskController.create);
    app.get('/api/tasks', taskController.list);
    app.get('/api/tasks/:taskId', taskController.retrieve);
    app.put('/api/tasks/:taskId', taskController.update);
    app.delete('/api/tasks/:taskId', taskController.destroy);
    app.post('/api/tasks/taskItems',taskItemController.create);
    app.post('/api/goals', goalController.create);
    app.delete('/api/goals/:goalId', goalController.destroy);
    //add routes for creating habits
}