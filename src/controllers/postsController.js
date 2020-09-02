import { ERROR_MESSAGES } from '../constants';
import { createPost, getAllPosts, getPostById, removePostById, updatePost } from '../services/postService';

const getAll = async function (req, res, next) {
  try {
    const posts = await getAllPosts();

    res.send(posts);
  } catch (e) {
    res.status(400).end(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
  }
};

const create = async function (req, res, next) {
  try {
    const { currentUser: { id: userId }, body: { text } } = req;
    const post = await createPost(text, userId);
    res.send(post);
  } catch (e) {
    res.status(400).end(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
  }
};

const update = async function (req, res, next) {
  try {
    const post = await updatePost(req.body);

    res.send(post);
  } catch (e) {
    res.status(400).end(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
  }
};

const getById = async function (req, res, next) {
  try {
    const post = await getPostById(req.params.id);

    res.send(post.toJSON());
  } catch (e) {
    res.status(404).end(ERROR_MESSAGES.POST_UNAVAILABLE);
  }
};

const removeById = async function (req, res, next) {
  try {
    await removePostById(req.params.id);

    res.send(200);
  } catch (e) {
    res.status(404).end(ERROR_MESSAGES.POST_UNAVAILABLE);
  }
};

export {
  getAll,
  create,
  update,
  getById,
  removeById,
};
