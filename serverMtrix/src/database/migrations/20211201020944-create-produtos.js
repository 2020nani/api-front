'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('produtos', {
      codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      tipo_embalagem: {
        type: Sequelize.ENUM("1","2","3"),
        defaultValue: "1",
        allowNull: false,
      },
      quantidade_embalagem: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      peso: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('produtos');
  },
};
