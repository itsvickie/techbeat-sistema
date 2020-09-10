import Sequelize, { Model } from 'sequelize';

class produto_venda extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncremente: true
            },
            vendaID: Sequelize.INTEGER,
            produtoID: Sequelize.INTEGER
        },{
            sequelize
        });

        return this;
    }

    static associate(models){
        this.belongsTo(models.venda, { foreignKey: 'vendaID', as: 'venda' });
        this.belongsTo(models.produto, { foreignKey: 'produtoID', as: 'produto' });
    }
}

export default produto_venda;