import Sequelize, { Model } from 'sequelize';

class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        codigo: {
                 type:Sequelize.INTEGER,
                 primaryKey: true,
                 },
        descricao: Sequelize.STRING,
        preco: Sequelize.BIGINT,
        tipoEmbalagem: Sequelize.STRING,
        quantidadeEmbalagem: Sequelize.INTEGER,
        peso: Sequelize.INTEGER

      },
      {
        sequelize,
      }
    );

  }

}

export default Produto;