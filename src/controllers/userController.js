import { ERROR_MESSAGES } from '../constants';
import { findUserById, getAllUsers } from '../services/userService';

const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send(users);
  } catch (e) {
    res.status(400).end(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.userId);
    if (!user) {
      return res.send(404).end(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    const { password, ...userValuesWithoutPassword } = user.dataValues;

    return res.send(userValuesWithoutPassword);
  } catch (e) {
    return res.status(400).end(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
  }
};

export { getUsers, getUserById };
