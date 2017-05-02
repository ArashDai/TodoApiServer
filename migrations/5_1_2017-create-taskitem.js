// module.exports = {
//   up: (queryInterface, Sequelize) =>
//     queryInterface.createTable('TaskItems', {
//         taskItemId: {
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//             type: Sequelize.INTEGER,
//         },
//         name: {
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//         createdAt: {
//             allowNull: false,
//             type: Sequelize.DATE,
//         },
//         updatedAt: {
//             allowNull: false,
//             type: Sequelize.DATE,
//         },
//         description: {
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//         duration: {
//             type: Sequelize.INTEGER,
//             allowNull: true,
//         },
//         attachments: {
//             type: Sequelize.JSON,
//             allowNull: true,
//         },
//         taskId: {
//             type: Sequelize.UUID,
//             onDelete: 'CASCADE',
//             references: {
//                 model: 'Task',
//                 key: 'taskId',
//                 as: 'taskId',
//             },
//         },
//         userId: {
//             type: Sequelize.UUID,
//             onDelete: 'CASCADE',
//             references: {
//                 model: 'User',
//                 key: 'userId',
//                 as: 'userId',
//             },
//         }
  
//     }),
//   down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('TaskItems'),
// };