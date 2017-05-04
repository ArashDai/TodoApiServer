'use strict';
const bcrypt  = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
          username: DataTypes.STRING,
          email: { 
            type:DataTypes.STRING,
            unique:true
          },
          password: DataTypes.STRING,
          schedule: DataTypes.JSON,
          activeTasks: DataTypes.ARRAY(DataTypes.DECIMAL),
          activeGoals: DataTypes.ARRAY(DataTypes.DECIMAL),
          completedTasks: DataTypes.ARRAY(DataTypes.DECIMAL),
          completedGoals: DataTypes.ARRAY(DataTypes.DECIMAL)
          }, {
            classMethods: {
              associate: function(models) {
                // associations can be defined here
                // user.hasMany(models.task,{
                //     foreignKey: 'taskId',
                //     as: 'tasks'
                // })
                // user.hasMany(models.goal,{
                //     foreignKey: 'goalId',
                //     as:'goals'
                // })
                // user.hasMany(models.habit,{
                //     foreignKey: 'habitId',
                //     as:'habits'
                // })
              }
            },
            instanceMethods:{
              hashPassword(){
                this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
              },
              validatePassword(password){
                return bcrypt.compareSync(password,this.password)
              }
            },
            hooks: {
                beforeCreate(user){
                  user.hashPassword();
                },
                beforeUpdate(user){
                  if(user._changed.password){
                      user.hashPassword();
                  }
                }
            }                    
          });
        return user;
      };