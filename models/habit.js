'use strict';
module.exports = function(sequelize, DataTypes) {
  var habit = sequelize.define('habit', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    priority: DataTypes.STRING,
    frequency: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    daysActive: DataTypes.INTEGER,
    streaks: DataTypes.ARRAY(DataTypes.DECIMAL),
    landmarks: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        habit.hasMany(models.Task,{
          foreignKey: 'taskId',
          as: 'tasks'
        })
        habit.hasMany(models.Goal,{
          foreignKey: 'goalId',
          as: 'goals'
        })
        habit.hasOne(models.User,{
          foreignKey: 'userId',
          as: 'creator'
        })
      }
    }
  });
  return habit;
};