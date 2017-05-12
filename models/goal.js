'use strict';
module.exports = function(sequelize, DataTypes) {
  var goal = sequelize.define('goal', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    daysActive: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    priority: DataTypes.STRING,
    creator:DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          goal.hasMany(models.task,{
              onDelete:'CASCADE',
              foreignKey:'goalId',
              hooks:true
          })
         goal.belongsTo(models.user,{
              foreignKey: 'creator',
              onDelete: 'CASCADE'
         })
      }
    }
   });
  return goal;
};