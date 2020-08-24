import express from 'express';
import { createPost, getAllPosts, getPostById, updatePost, removePostById } from '../data/PostModel';
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';
import isAuthorized from '../middlewares/isAuthorized';
import { REMOVE_POST } from '../constants';
import isUserCanEditPost from '../middlewares/isUserCanEditPost';
import ERROR_MESSAGES from '../constants/errorMessages';

const router = express.Router();

router.get('/', isAuth, async function (req, res, next) {
  try {
    const posts = await getAllPosts();

    res.send(posts);
  } catch (e) {
    res.status(400).end(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
  }
});

router.post('/', isAuth, attachCurrentUser, async function (req, res, next) {
  try {
    const { currentUser: { id: userId }, body: { text } } = req;
    const post = await createPost(text, userId);
    res.send(post);
  } catch (e) {
    res.status(400).end(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
  }
});

router.put('/', isAuth, attachCurrentUser, isAuthorized({ isAuthorizedClb: isUserCanEditPost }), async function (req, res, next) {
  try {
    const post = await updatePost(req.body);

    res.send(post);
  } catch (e) {
    res.status(400).end(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const post = await getPostById(req.params.id);

    res.send(post.toJSON());
  } catch (e) {
    res.status(404).end(ERROR_MESSAGES.POST_UNAVAILABLE);
  }
});

router.delete('/:id', isAuth, attachCurrentUser, isAuthorized({ permission: REMOVE_POST }), async function (req, res, next) {
  try {
    await removePostById(req.params.id);

    res.send(200);
  } catch (e) {
    res.status(404).end(ERROR_MESSAGES.POST_UNAVAILABLE);
  }
});

export default router;
