import Sequelize, { Model } from 'sequelize';

class gastos_usuario extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncremente: true
            },
            gastosID: Sequelize.INTEGER,
            usuarioID: Sequelize.INTEGER
        },{
            sequelize
        });

        return this; 
    }

    static associate(models){
        this.belongsTo(models.gastos, { foreignKey: 'gastosID', as: 'gastos' });
        this.belongsTo(models.usuario, { foreignKey: 'usuarioID', as: 'usuario' });
    }
}

export default gastos_usuario;