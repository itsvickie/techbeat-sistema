import sequelize from 'sequelize';
import config from '../config/database';
import usuario from '../app/models/usuario';
import produto from '../app/models/produto';

const models = [usuario, produto];

class Database {
    constructor(){
        this.init();
    }

    init(){
        this.connection = new sequelize(config);
        models.map(model => model.init(this.connection));
    }
}

export default new Database();