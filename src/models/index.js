import { Sequelize } from 'sequelize';
import config from '../config/config';

const { username, password, database, port, host, dialect } = config.development;

const sequelize = new Sequelize(database, username, password, {
  dialect,
  host,
  port,
});

export default sequelize;
