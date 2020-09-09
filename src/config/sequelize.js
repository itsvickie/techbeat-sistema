import Sequelize from 'sequelize';
import config from './database';

const sequelize = new Sequelize(config);

export default sequelize;