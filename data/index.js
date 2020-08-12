import { Sequelize } from "sequelize";

const { databaseUsername, databasePassword, databaseName } = process.env;

const sequelize = new Sequelize(databaseName, databaseUsername, databasePassword, {
  dialect: "mysql",
  host: "localhost"
});

export default sequelize;
