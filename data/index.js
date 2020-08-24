import { Sequelize } from 'sequelize';

const { databaseUsername, databasePassword, databaseName } = process.env;

export default new Sequelize(databaseName, databaseUsername, databasePassword, {
  dialect: 'mysql',
  host: 'localhost',
});
