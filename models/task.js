'use strict';
module.exports = function(sequelize, DataTypes) {
  var task = sequelize.define('task', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    priority: DataTypes.STRING,
    goalId:DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        task.hasMany(models.taskItem,{
          onDelete:'CASCADE',
          hooks:true
        })
       // task.hasOne(models.user,{
       //     foreignKey: 'userId',
       //     as: 'creator',
       //     onDelete: 'CASCADE' 
       // })
        task.belongsTo(models.goal,{
            foreignKey: 'goalId',
            onDelete: 'CASCADE'    
        })
      }
    },

  });
  return task;
};