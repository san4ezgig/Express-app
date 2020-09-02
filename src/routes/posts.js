import express from 'express';
import isAuth from '../middleware/isAuth';
import attachCurrentUser from '../middleware/attachCurrentUser';
import isAuthorized from '../middleware/isAuthorized';
import { REMOVE_POST } from '../constants';
import isUserCanEditPost from '../middleware/isUserCanEditPost';
import { postsController } from '../controllers';

const router = express.Router();

router.get('/', isAuth, postsController.getAll);

router.post('/', isAuth, attachCurrentUser, postsController.create);

router.put('/', isAuth, attachCurrentUser, isAuthorized({ isAuthorizedClb: isUserCanEditPost }), postsController.update);

router.get('/:id', postsController.getById);

router.delete('/:id', isAuth, attachCurrentUser, isAuthorized({ permission: REMOVE_POST }), postsController.removeById);

export default router;
