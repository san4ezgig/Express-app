import { ERROR_MESSAGES, ROLES } from '../constants';

export default () => {
  return (req, res, next) => {
    const { currentUser: { role, id: currentUserId }, body: { userId: postAuthorId } } = req;

    if (role === ROLES.admin) {
      return next();
    }

    if (String(currentUserId) !== String(postAuthorId)) {
      return res.status(401).end(ERROR_MESSAGES.NOT_AUTHORIZED);
    }

    return next();
  };
}
