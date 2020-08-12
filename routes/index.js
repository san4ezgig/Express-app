const express = require('express');
const router = express.Router();
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("usersdb2", "root", '', {
  dialect: "mysql",
  host: "localhost"
});

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  res.send('responce');
});

module.exports = router;
