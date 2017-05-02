module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    taskId: {
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
  
  }, {
    classMethods: {
      associate: (models) => {
        Task.hasMany(models.TaskItem,{
          foreignKey: 'taskItemId',
          as: 'taskItems'
        })
        Task.hasOne(models.User,{
            foreignKey: 'userId',
            as: 'creator',
            onDelete: 'CASCADE' 
        })
        Task.belongsTo(models.Goal,{
            foreignKey: 'goalId',
            onDelete: 'CASCADE'    
        })
      },
    },
    hooks: {
      beforeCreate: function(task, options, cb) { 
        task.taskId = UUIDV4(); 
        return cb(null, options);
      }
    }
  });
  return Task;
};