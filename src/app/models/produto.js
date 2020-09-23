import Sequelize, { Model } from 'sequelize';

class produto extends Model{
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
            inatividade: Sequelize.BOOLEAN
        }, {
            sequelize
        });

        return this;
    }
}

export default produto;