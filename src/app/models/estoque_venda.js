import Sequelize, { Model } from 'sequelize';

class estoque_venda extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncremente: true
            },
            vendaID: Sequelize.INTEGER,
            estoqueID: Sequelize.INTEGER
        },{
            sequelize
        });

        return this;
    }

    static associate(models){
        this.belongsTo(models.venda, { foreignKey: 'vendaID', as: 'venda' });
        this.belongsTo(models.estoque, { foreignKey: 'estoqueID', as: 'estoque' });
    }
}

export default estoque_venda;