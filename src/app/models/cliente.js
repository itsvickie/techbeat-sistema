import Sequelize, { Model } from 'sequelize';

class cliente extends Model{
    static init(sequelize) {
        super.init({
          id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncremente: true
          },
          nome: Sequelize.STRING,
          telefone: Sequelize.INTEGER,
          instagram: Sequelize.STRING,
          cpf: Sequelize.INTEGER
        },{
            sequelize
        });
    }
}

export default cliente;