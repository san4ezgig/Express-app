import { findUserById, getAllUsers } from '../data/UserModel';
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';
import isAuthorized from '../middlewares/isAuthorized';
import { ERROR_MESSAGES, GET_ALL_USER } from '../constants';
import express from 'express';

const router = express.Router();

router.get('/', isAuth, attachCurrentUser, isAuthorized({ permission: GET_ALL_USER }), async function (req, res, next) {
  try {
    const users = await getAllUsers();

    res.send(users);
  } catch (e) {
    res.status(400).end(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
  }
});

router.get('/:userId', isAuth, async function (req, res, next) {
  try {
    const user = await findUserById(req.params.userId);

    res.send(user.toJSON());
  } catch (e) {
    res.status(400).end(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
  }
});

export default router;
