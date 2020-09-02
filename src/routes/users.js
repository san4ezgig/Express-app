import isAuth from '../middleware/isAuth';
import attachCurrentUser from '../middleware/attachCurrentUser';
import isAuthorized from '../middleware/isAuthorized';
import { GET_ALL_USER } from '../constants';
import express from 'express';
import { userController } from '../controllers';

const router = express.Router();

router.get('/', isAuth, attachCurrentUser, isAuthorized({ permission: GET_ALL_USER }), userController.getUsers);

router.get('/:userId', isAuth, userController.getUserById);

export default router;
