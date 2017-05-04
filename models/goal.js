'use strict';
module.exports = function(sequelize, DataTypes) {
  var goal = sequelize.define('goal', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    daysActive: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    priority: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
          // goal.hasMany(models.task,{
          //     foreignKey: 'taskId',
          //     as: 'tasks'
          // })
        //  goal.hasOne(models.user,{
        //      foreignKey: 'userId',
        //      as:'creator'
        //  })
      }
    },
  //   hooks: {
  //       beforeCreate: function(goal, options, cb) { 
  //         return cb(null, options);
  //       }
  //     }
   });
  return goal;
};