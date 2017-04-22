module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    taskId: {
      type: DataTypes.UUIDV4,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    description: {
      type: DataTypes.STRING,
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
            as: 'creator'
        })
        Task.belongsTo(models.Goal,{
            foreignKey: 'goalId',
            onDelete: 'CASCADE'    
        })
      },
    },
  });
  return Task;
};