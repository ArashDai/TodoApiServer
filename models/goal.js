module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define('Goal', {
    goalId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    }, 
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    daysActive: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    priority: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },{
      classMethods: {
        associate: (models) => {
          Goal.hasMany(models.Task,{
              foreignKey: 'todoId',
              as: 'tasks'
          })
          Goal.hasOne(models.User,{
              foreignKey: 'userId',
              as:'creator'
          })
        },
      },
      hooks: {
        beforeCreate: function(goal, options, cb) { 
          goal.goalId = UUIDV4(); 
          return cb(null, options);
        }
      }
  });
  return Goal;
};