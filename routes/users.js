const express = require('express');
const router = express.Router();
import { createUser } from '../data/UserModel';

/* GET users listing. */
router.get('/', async function(req, res, next) {
  await createUser();
  res.send('respond with a resource');
});

module.exports = router;
