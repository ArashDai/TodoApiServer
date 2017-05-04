'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('taskItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      taskId: {
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        onUpdate: 'CASCADE'
        // references: {
        //   model: 'tasks',
        //   key: 'id',
        //   as: 'taskId',
        //   onInsert: 'CASCADE'
        // }
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.INTEGER
      },
      attachments: {
        type: Sequelize.JSON
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
    return queryInterface.dropTable('taskItems');
  }
};