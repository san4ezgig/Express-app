import { Sequelize } from 'sequelize';
import config from '../config/config';

const { username, password, database, port } = config.development;

const sequelize = new Sequelize(database, username, password, {
  dialect: 'mysql',
  host: 'localhost',
  port,
});

export default sequelize;
