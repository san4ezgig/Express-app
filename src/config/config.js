require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.databaseUsername,
    "password": process.env.databasePassword,
    "database": process.env.databaseName,
    "host": process.env.mySqlHost,
    "port": 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};
