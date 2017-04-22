const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignin = passport.authenticate('local',{session:false});


module.exports = (app) => {
    app.get('/',requireAuth,(req,res) => {res.status(200).send({hello:'world'});});
    app.post('/signin', requireSignin, Authentication.signin )
    app.post('/signup', Authentication.signup)

    //app.post('/api/todos', todosController.create);
    //app.get('/api/todos', todosController.list);
    //app.get('/api/todos/:todoId', todosController.retrieve);
    //app.put('/api/todos/:todoId', todosController.update);
    //app.delete('/api/todos/:todoId', todosController.destroy);
    //app.post('/api/todos/:todoId/items',todoItemsController.create);

}