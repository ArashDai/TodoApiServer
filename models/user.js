'use strict';
module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
          username: DataTypes.STRING,
          email: DataTypes.STRING,
          password: DataTypes.STRING,
          schedule: DataTypes.JSON,
          activeTasks: DataTypes.ARRAY(DataTypes.DECIMAL),
          activeGoals: DataTypes.ARRAY(DataTypes.DECIMAL),
          completedTasks: DataTypes.ARRAY(DataTypes.DECIMAL),
          completedGoals: DataTypes.ARRAY(DataTypes.DECIMAL)
                  }, {
                    classMethods: {
                      associate: function(models) {
                        // associations can be defined here
                        user.hasMany(models.task,{
                            foreignKey: 'taskId',
                            as: 'tasks'
                        })
                        user.hasMany(models.goal,{
                            foreignKey: 'goalId',
                            as:'goals'
                        })
                      }
                    },
                    hooks: {
                      beforeCreate: function(user, options, cb) {
                        debug('Info: '+'Storing the password');  
                        //user.userId = UUIDV4(); 
                      
                        encryptPassword(user.password, function(err, hash) {
                          if (err) return cb(err);
                          debug('Info: ' + 'getting ' + encrypted);
                          user.password = hash;
                          debug('Info: ' + 'password now is: ' + model.password);
                          return cb(null, options);
                        });
                      }
                    }                    
                  });
                return user;
              };