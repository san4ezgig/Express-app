import { Sequelize } from 'sequelize';
import config from '../config/config';

const { username, password, database, port, host } = config.development;

const sequelize = new Sequelize(database, username, password, {
  dialect: 'mysql',
  host,
  port,
});

export default sequelize;
