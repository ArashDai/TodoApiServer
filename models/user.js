const bcrypt = require('bcrypt-nodejs');

function encryptPassword(password,callback){
    bcrypt.genSalt(10,function(err, salt){
      if(err) callback(err);
      bcrypt.hash(password,salt,function(err, hash){
        return callback(err, hash)
      });
    });
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    }, 
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    schedule: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    activeTasks: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      allowNull: true,
    },
    activeGoals: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      allowNull: true,
    },
    completedTasks: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      allowNull: true,
    },
    completedGoals: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      allowNull: true,
    }
  },{
      classMethods: {
        associate: (models) => {
          User.hasMany(models.Task,{
              foreignKey: 'taskId',
              as: 'tasks'
          })
          User.hasMany(models.Goal,{
              foreignKey: 'goalId',
              as:'goals'
          })
        },
      },
      hooks: {
        beforeCreate: function(user, options, cb) {
          debug('Info: '+'Storing the password');  
          user.userId = UUIDV4(); 
         
          encryptPassword(user.password, function(err, hash) {
            if (err) return cb(err);
            debug('Info: ' + 'getting ' + encrypted);
            user.password = hash;
            debug('Info: ' + 'password now is: ' + model.password);
            return cb(null, options);
          });
        }

      }
    }
  );
  return User;
};