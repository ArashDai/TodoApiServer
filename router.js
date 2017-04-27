const passport = require('passport');
const passportService = require('./services/passport');

const Authentication = require('./controllers/authentication');
const taskController = require('./controllers').taskController;
const taskItemController = require('./controllers').taskItemController;

const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignin = passport.authenticate('local',{session:false});


module.exports = (app) => {
    app.get('/',requireAuth,(req,res) => {res.status(200).send({hello:'world'});});
    app.post('/signin', requireSignin, Authentication.signin )
    app.post('/signup', Authentication.signup)
    //make routes for goals and habits
    app.post('/api/tasks', taskController.create);
    app.get('/api/tasks', taskController.list);
    app.get('/api/tasks/:taskId', taskController.retrieve);
    app.put('/api/tasks/:taskId', taskController.update);
    app.delete('/api/tasks/:taskId', taskController.destroy);
    app.post('/api/tasks/:taskId/taskItems',taskItemController.create);
}