'use strict';
module.exports = function(sequelize, DataTypes) {
  var task = sequelize.define('task', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    priority: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Task.hasMany(models.taskItem,{
          foreignKey: 'taskItemId',
          as: 'taskItems'
        })
        Task.hasOne(models.user,{
            foreignKey: 'userId',
            as: 'creator',
            onDelete: 'CASCADE' 
        })
        Task.belongsTo(models.goal,{
            foreignKey: 'goalId',
            onDelete: 'CASCADE'    
        })
      }
    },
    // hooks: {
    //   beforeCreate: function(task, options, cb) { 
    //     task.taskId = UUIDV4(); 
    //     return cb(null, options);
    //   }
    // }
  });
  return task;
};