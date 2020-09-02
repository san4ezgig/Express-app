import { ERROR_MESSAGES, ROLES } from '../constants';
import { getPostById } from '../services/postService';

export default () => {
  return async (req, res, next) => {
    const { currentUser: { role, id: currentUserId }, body: { id: postId } } = req;
    try {
      const { userId: postAuthorId} = await getPostById(postId);

      if (role === ROLES.admin) {
        return next();
      }

      if (String(currentUserId) !== String(postAuthorId)) {
        return res.status(401).end(ERROR_MESSAGES.NOT_AUTHORIZED);
      }

      return next();
    } catch (e) {
      return res.status(404).end(ERROR_MESSAGES.NOT_FOUND);
    }
  };
}
