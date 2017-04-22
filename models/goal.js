module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define('Goal', {
    goalId: {
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
  
  }, {
    classMethods: {
      associate: (models) => {
        Goal.hasMany(models.Task,{
            foreignKey: 'todoId',
            as: 'tasks'
        })
        Goal.hasOne(models.User,{
            foreignKey: 'userId',
            as:'creator'
        })
      },
    },
  });
  return Goal;
};