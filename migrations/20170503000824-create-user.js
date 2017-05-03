'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('users', {
              id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              username: {
                type: Sequelize.STRING
              },
              email: {
                type: Sequelize.STRING
              },
              password: {
                type: Sequelize.STRING
              },
              schedule: {
                type: Sequelize.JSON
              },
              activeTasks: {
                type: Sequelize.ARRAY(Sequelize.INTEGER)
              },
              activeGoals: {
                  type: Sequelize.ARRAY(Sequelize.INTEGER)
              },
              completedTasks: {
                  type: Sequelize.ARRAY(Sequelize.INTEGER)
              },
              completedGoals: {
                  type: Sequelize.ARRAY(Sequelize.INTEGER)
              },
              createdAt: {
                  allowNull: false,
                  type: Sequelize.DATE
              },
              updatedAt: {
                  allowNull: false,
                  type: Sequelize.DATE
              }
            });
          },
          down: function(queryInterface, Sequelize) {
                return queryInterface.dropTable('users');
              }
          };