module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    }, 
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    schedule: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    activeTasks: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      allowNull: true,
    },
    activeGoals: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      allowNull: true,
    },
    completedTasks: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      allowNull: true,
    },
    completedGoals: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      allowNull: true,
    }
  });
  return User;
};