import { ERROR_MESSAGES, PERMISSIONS } from '../constants';

export default ({ permission, isAuthorizedClb }) => {
  if (isAuthorizedClb) {
    return isAuthorizedClb(permission);
  }

  return (req, res, next) => {
    const { currentUser } = req;
    if (!currentUser) {
      return res.status(401).end(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const { dataValues: { role } } = currentUser;

    const permissionsForCurrentUserRole = PERMISSIONS[role];

    if (!permissionsForCurrentUserRole.includes(permission)) {
      return res.status(401).end(ERROR_MESSAGES.NOT_AUTHORIZED);
    }

    return next();
  };
}
