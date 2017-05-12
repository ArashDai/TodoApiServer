'use strict';
module.exports = function(sequelize, DataTypes) {
  var taskItem = sequelize.define('taskItem', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    attachments: DataTypes.JSON,
    taskId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        taskItem.belongsTo(models.task,{
          foreignKey: 'taskId',
          onDelete: 'CASCADE'
        });
      }
    },
  });
  return taskItem;
};