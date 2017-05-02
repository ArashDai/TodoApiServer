// module.exports = {
//   up: (queryInterface, Sequelize) =>
//     queryInterface.createTable('Users', {
//         userId: {
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//             type: Sequelize.UUID,
//         },
//         email: {
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
//         password: {
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//         username: {
//             type: Sequelize.STRING,
//             allowNull: true,
//         }, 
//         schedule: {
//             type: Sequelize.JSON,
//             allowNull: true,
//         },
//         activeTasks: {
//             type: Sequelize.ARRAY(Sequelize.DECIMAL),
//             allowNull: true,
//         },
//         activeGoals: {
//             type: Sequelize.ARRAY(Sequelize.DECIMAL),
//             allowNull: true,
//         },
//         completedTasks: {
//             type: Sequelize.ARRAY(Sequelize.DECIMAL),
//             allowNull: true,
//         },
//         completedGoals: {
//             type: Sequelize.ARRAY(Sequelize.DECIMAL),
//             allowNull: true,
//         }
//     }),
//   down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Users'),
// };