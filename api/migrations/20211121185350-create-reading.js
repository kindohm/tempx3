'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Readings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      temperature: {
        allowNull:false,
        type: Sequelize.FLOAT
      },
      pressure: {
        allowNull:false,
        type: Sequelize.FLOAT
      },
      humidity: {
        allowNull:false,
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull:false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Readings');
  }
};