import Sequelize, { Model } from 'sequelize';

class venda extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncremente: true
            },
            data_compra: Sequelize.DATE,
            garantia: Sequelize.DATE,
            observacoes: Sequelize.STRING,
            testado: Sequelize.INTEGER,
            extra: Sequelize.STRING,
            local_venda: Sequelize.STRING,
            data_entrega: Sequelize.DATE,
            pagamento: Sequelize.INTEGER,
            entregue: Sequelize.INTEGER,
            valor_total: Sequelize.FLOAT,
            usuarioID: Sequelize.INTEGER,
            clienteID: Sequelize.INTEGER
        },{
            sequelize
        });

        return this;
    }

    static associate(models){
        this.belongsTo(models.usuario, { foreignKey: 'usuarioID', as: 'usuario' });
        this.belongsTo(models.cliente, { foreignKey: 'clienteID', as: 'cliente' });
    }
}

export default venda;