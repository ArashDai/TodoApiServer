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
        // habit.hasMany(models.task,{
        //   foreignKey: 'taskId',
        //   as: 'tasks'
        // })
        habit.hasMany(models.goal,{
          foreignKey: 'goalId',
          as: 'goals'
        })
       // habit.hasOne(models.user,{
       //   foreignKey: 'userId',
       //   as: 'creator'
       // })
      }
    }
  });
  return habit;
};