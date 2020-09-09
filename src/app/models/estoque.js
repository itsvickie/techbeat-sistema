import Sequelize, { Model } from 'sequelize';

class estoque extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncremente: true
            },
            nome: Sequelize.STRING,
            tipo: Sequelize.STRING,
            marca: Sequelize.STRING,
            descricao: Sequelize.STRING,
            valor_pago: Sequelize.FLOAT,
            preco_base: Sequelize.FLOAT,
            quantidade: Sequelize.INTEGER
        }, {
            sequelize
        });
    }
}

export default estoque;