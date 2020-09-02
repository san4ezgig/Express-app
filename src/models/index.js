import { Sequelize } from 'sequelize';
import config from '../config/config';

const { databaseUsername, databasePassword, databaseName } = config.development;

const sequelize = new Sequelize(databaseName, databaseUsername, databasePassword, {
  dialect: 'mysql',
  host: 'localhost',
  port: 3307,
});
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
