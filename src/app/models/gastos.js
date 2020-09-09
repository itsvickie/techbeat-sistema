import Sequelize, { Model } from 'sequelize';

class gastos extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncremente: true
            },
            data_cadastro: Sequelize.DATE,
            descricao: Sequelize.STRING,
            valor: Sequelize.FLOAT
        },{
            sequelize
        });
    }
}

export default gastos;