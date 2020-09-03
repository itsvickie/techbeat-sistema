import usuario from '../models/usuario';
import Sequelize, { QueryTypes } from 'sequelize';
import config from '../../config/database';

const sequelize = new Sequelize(config);

class SessionController{
    async teste(req, res){
        // const user = await usuario.findAll();
        const user = await sequelize.query('SELECT nome FROM usuario', {
            model: usuario
        });
        return res.json(user);
    }
}

export default new SessionController();