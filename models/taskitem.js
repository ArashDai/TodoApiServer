module.exports = (sequelize, DataTypes) => {
  const TaskItem = sequelize.define('TaskItem', {
    taskItemId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    attachments: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  
  }, {
    classMethods: {
      associate: (models) => {
        TaskItem.belongsTo(models.Task,{
          foreignKey: 'taskId',
          onDelete: 'CASCADE'
        });
      },
    },
  });
  return TaskItem;
};