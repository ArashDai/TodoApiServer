// module.exports = {
//   up: (queryInterface, Sequelize) =>
//     queryInterface.createTable('Tasks', {
//       taskId: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//       },
//       name: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//       description: {
//         type: Sequelize.STRING,
//         allowNull: true,
//       },
//       priority: {
//         type: Sequelize.STRING,
//         allowNull: true,
//       },
//       userId: {
//         type: Sequelize.UUID,
//         onDelete: 'CASCADE',
//         references: {
//             model: 'User',
//             key: 'userId',
//             as: 'userId',
//           },
//         }
//     }),
//   down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Tasks'),
// };