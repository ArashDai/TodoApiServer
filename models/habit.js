module.exports = (sequelize, DataTypes) => {
  const Habit = sequelize.define('Habit', {
    habitId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    }, 
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    priority: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    frequency: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    daysActive: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    streaks: {
      type: DataTypes.ARRAY(DataTypes.ARRAY),
      allowNull: true,
    },
    landmarks: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
  
  }, {
    classMethods: {
      associate: (models) => {
        Habit.hasMany(models.Task,{
          foreignKey: 'taskId',
          as: 'task'
        })
        Habit.hasMany(models.Goal,{
          foreignKey: 'goalId',
          as: 'goal'
        })
        Habit.hasOne(models.User,{
          foreignKey: 'userId',
          as: 'creator'
        })
      },
    },
    hooks: {
        beforeCreate: function(habit, options, cb) { 
          habit.habitId = UUIDV4(); 
          return cb(null, options);
        }
      }
  });
  return Habit;
};