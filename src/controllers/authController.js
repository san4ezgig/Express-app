import { createUser, login } from '../services/userService';
import { ERROR_MESSAGES } from '../constants';

const signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const data = await createUser(body);

    res.send(data);
  } catch (e) {
    console.log(e);
    res.status(400).end(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { body: { email, password } } = req;
    const data = await login(email, password);

    res.send(data);
  } catch (e) {
    res.status(400).end(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }
};

export { signUp, signIn };
