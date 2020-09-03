import Sequelize, { Model } from 'sequelize';

class usuario extends Model{
    static init(sequelize) {
        super.init({
            id: { 
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncremente: true
            },
            nome: Sequelize.STRING,
            email: Sequelize.STRING,
            senha: Sequelize.STRING
        },{
            sequelize
        });
    }
}

export default usuario;