import { createUser, login } from '../data/UserModel';
import { ERROR_MESSAGES } from '../constants';
import express from 'express';

const router = express.Router();

router.post('/signup', async function (req, res, next) {
  try {
    const { body } = req;
    const data = await createUser(body);

    res.send(data);
  } catch (e) {
    res.send(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }
});

router.post('/login', async function (req, res, next) {
  try {
    const { body: { email, password } } = req;
    const data = await login(email, password);

    res.send(data);
  } catch (e) {
    res.send(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }
});

export default router;
